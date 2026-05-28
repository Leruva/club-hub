const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({

   student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
   },

   registeredAt: {
      type: Date,
      default: Date.now
   },

   attendanceStatus: {
      type: Boolean,
      default: false
   },

   ticketQR: String,

   certificateIssued: {
      type: Boolean,
      default: false
   }

}, { timestamps: true });
registrationSchema.index({ eventId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);