const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  collegeId: String,
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);