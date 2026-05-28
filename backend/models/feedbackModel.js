const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

   student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
   },

   rating: {
      type: Number,
      min: 1,
      max: 5
   },

   comment: String

}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);