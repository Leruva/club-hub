const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  venue: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: { type: Date, required: true },
  maxParticipants: Number,
  registrationCount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'published',
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);