const mongoose = require('mongoose');

const hiringSchema = new mongoose.Schema({

   club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
   },

   title: String,

   description: String,

   applicationLink: {
      type: String,
      required: true
   },

   requirements: [String],

   deadline: Date,

   postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
   }

}, { timestamps: true });

module.exports = mongoose.model('Hiring', hiringSchema);