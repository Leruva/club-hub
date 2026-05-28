const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  profileImage: String,

  year: String,

  course: String,

  interests: [String],

  globalRole: {
    type: String,
    enum: ["student", "superAdmin"],
    default: "student"
  },
  collegeId: String,
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);