const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

   title: {
      type: String,
      required: true
   },

   description: String,

   bannerImage: String,

   club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
   },

   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   category: String,

   venue: String,

   startDate: Date,

   endDate: Date,

   registrationDeadline: Date,

   maxParticipants: Number,

   tags: [String],

   status: {
      type: String,
      enum: [
         "draft",
         "pendingApproval",
         "approved",
         "rejected",
         "completed"
      ],
      default: "pendingApproval"
   },

   qrCode: String

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);