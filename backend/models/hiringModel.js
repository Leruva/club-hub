const mongoose = require('mongoose');

const hiringSchema = new mongoose.Schema({

   club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
   },

   title: String,

   description: String,

   requirements: [String],

   deadline: Date,

   postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }

}, { timestamps: true });

module.exports = mongoose.model('Hiring', hiringSchema);