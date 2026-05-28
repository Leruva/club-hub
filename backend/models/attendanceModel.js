const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

   registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration"
   },

   scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   scannedAt: {
      type: Date,
      default: Date.now
   }

});

module.exports = mongoose.model("Attendance", attendanceSchema);