const User = require('../../models/userModel');
const Club = require('../../models/clubModel');
const ClubMember = require('../../models/clubMemberModel');

const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');
const crypto = require('crypto');
const PasswordResetToken = require('../../models/passwordResetTokenModel');
const sendEmail = require('../../utils/sendEmail');


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


const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('There is no user with that email address.');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await PasswordResetToken.deleteMany({ userId: user._id }); 
    await PasswordResetToken.create({
        userId: user._id,
        token: hashedToken,
        expiresAt: Date.now() + 60 * 60 * 1000 
    });

    const resetURL = `http://localhost:5173/reset-password?token=${resetToken}`;
    const message = `Forgot your password? Submit your new password here: \n${resetURL}\nIf you didn't forget your password, please ignore this email!`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 1 hour)',
            message
        });
        return { message: 'Token sent to email!' };
    } catch (err) {
        await PasswordResetToken.deleteMany({ userId: user._id });
        throw new Error('There was an error sending the email. Try again later!');
    }
};

const resetPassword = async (token, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const resetRecord = await PasswordResetToken.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() }
    });

    if (!resetRecord) {
        throw new Error('Token is invalid or has expired');
    }

    const user = await User.findById(resetRecord.userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await PasswordResetToken.findByIdAndDelete(resetRecord._id);

    return { message: 'Password updated successfully' };
};

module.exports = {
    registerStudent,
    loginStudent,
    registerClub,
    loginClub,
    forgotPassword,
    resetPassword
};