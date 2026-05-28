const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({

   club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
   },

   title: String,

   content: String,

   postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }

}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);