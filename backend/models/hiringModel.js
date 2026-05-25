const mongoose = require('mongoose');

const hiringSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  rolesNeeded: [{ type: String }],
  eligibility: String,
  applicationLink: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Hiring', hiringSchema);