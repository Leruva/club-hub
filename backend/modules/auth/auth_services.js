const User = require('../../models/userModel');
const Club = require('../../models/clubModel');
const ClubMember = require('../../models/clubMemberModel');

const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');


const registerStudent = async (data) =>{
    const existing = await User.findOne({email: data.email});
    if (existing) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        year: data.year,
        course: data.course,
        globalRole: 'student',
        isVerified: true
    });

    return generateToken({
        id: user._id,
        role: user.globalRole,
        type: 'user'
    });
};

const loginStudent = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if(!user){
        throw new Error('User not found');
    }

    const ok = await bcrypt.compare(
        password,
        user.password
    );

    if(!ok){
        throw new Error('Invalid credentials');
    }

    return generateToken({
        id: user._id,
        role: user.globalRole,
    });
};

const registerClub = async (data, userId) => {

    const existing = await Club.findOne({
        officialEmail: data.officialEmail
    });

    if(existing){
        throw new Error('Club email already exists');
    }

    const club = await Club.create({

        clubName: data.clubName,

        description: data.description,

        category: data.category,

        officialEmail: data.officialEmail,

        logo: data.logo,

        createdBy: userId,

        approval: {
            status: 'pending'
        }

    });

    return {
        message: 'Club request submitted for approval',
        club
    };
};

const loginClub = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if(!user){
        throw new Error('User not found');
    }

    const ok = await bcrypt.compare(
        password,
        user.password
    );

    if(!ok){
        throw new Error('Invalid credentials');
    }

    const membership = await ClubMember.findOne({
        user: user._id
    }).populate('club');

    if(!membership){
        throw new Error('No club access found');
    }

    if(
        membership.club.approval.status === 'pending'
    ){
        throw new Error('Club not approved yet');
    }

    if(
        membership.club.approval.status === 'rejected'
    ){
        throw new Error('Club request rejected');
    }

    const allowedRoles = [
        "president",
        "vicePresident",
        "coordinator"
    ];  

    if(!allowedRoles.includes(membership.role)){
        throw new Error('Not authorized for club login');
    }

    return generateToken({
        id: user._id,
        role: membership.role,
        clubId: membership.club._id,
    });
};


module.exports = {
    registerStudent,
    loginStudent,
    registerClub,
    loginClub
};