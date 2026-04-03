const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const Club = require('../../models/clubModel');
const { eventNames } = require('../../models/userModel');

const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '60m',
    });
}

const registerStudent = async (data) =>{
    const existing = await User.findOne({email: data.email});
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = User.create({
        name : data.name,
        email : data.email,
        passwordHash,
        collegeId: data.collegeId,
        role: 'student',
        isVerified: true,
    });
    return generateToken({ id: user._id, role: user.role, type: 'user' });    
}

const loginStudent = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('Users is not registered');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) throw new Error('Invalid Credentials');

    return generateToken({id: user._id, role: user.role, type: 'user'});
};

const registerClub = async (data) => {
    const existing = await Club.findOne({email: data.email});
    if(existing) throw new Error('Invalid credentials');

    const passwordHash = await bcrypt.hash(data.password, 10);

    const club = await Club.create({
        name : data.name,
        email : data.email,
        passwordHash,
        presidentName : data.presidentName,
        description: data.description,
    });

    return { message: 'Club registration submitted for admin approval' };
}

const loginClub = async ({email, password}) => {
    const club = await Club.findOne({ email });
    if(!club) throw new Error ('Club not found');

    if(club.status == 'pending'){
        throw new Error ('Club not approved yet');
    }
    if(club.status == 'rejected'){
        throw new Error ('Club not approved');
    }
    
    const ok = await bcrypt.compare(password, club.passwordHash);
    if(!ok) throw new Error ('Invalid credentials');

    return generateToken({id: club._id, role: 'club', type : 'club'});
    
} 

module.exports = {
    registerStudent,
    registerClub,
    loginStudent,
    loginClub,
}