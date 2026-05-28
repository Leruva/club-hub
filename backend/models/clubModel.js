const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({

   clubName: {
      type: String,
      required: true,
      trim: true
   },

   description: {
      type: String
   },

   category: {
      type: String
   },

   logo: {
      type: String
   },

   bannerImage: {
      type: String
   },

   officialEmail: {
      type: String,
      unique: true,
      required: true
   },

   phoneNumber: {
      type: String
   },

   socialLinks: {
      instagram: String,
      linkedin: String,
      website: String,
      discord: String
   },

   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   approval: {
      status: {
         type: String,
         enum: ["pending", "approved", "rejected"],
         default: "pending"
      },

      reviewedBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },

      reviewedAt: Date,

      rejectionReason: String
   },

   isActive: {
      type: Boolean,
      default: true
   }

}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);