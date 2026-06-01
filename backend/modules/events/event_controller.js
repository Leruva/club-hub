const Event = require('../../models/eventModel');
const Registration = require('../../models/registrationModel');
const Feedback = require('../../models/feedbackModel');

const createEvent = async (req,res) =>{
    try{
        const event = await Event.create({
            ...req.body,
            clubId: req.user.clubId,
            createdBy: req.user.id
        });
        res.status(201).json(event);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const getAllEvents = async (req, res) =>{
    try{
        const events = await Event.find();
        res.status(200).json(events);
    }catch(err){
        res.status(500).json({message: err.message}); 
    }
}

const registerForEvent = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'approved') {
      return res.status(400).json({ message: 'Event is not open for registration' });
    }
    const existingRegistration =
      await Registration.findOne({
          eventId: req.params.id,
          studentId: req.user.id
      });

    if(existingRegistration){
      return res.status(400).json({
          message: 'Already registered'
      });
    }
    if (new Date() > event.registrationDeadline || event.status == 'completed') {
      return res.status(400).json({ message: 'Registration deadline has passed or Event is completed' });
    }

    const registrationCount = await Registration.countDocuments({
        eventId: req.params.id
    });


    if (event.maxParticipants && registrationCount >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    const registration = await Registration.create({
      eventId: req.params.id,
      studentId: req.user.id,
    });
    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ message: 'Already registered or invalid request' });
  }
};

const getRegistrations = async (req, res) => {
  const list = await Registration.find({ eventId: req.params.id }).populate('studentId', 'fullName email');
  res.json(list);
};

const getSingleEvent = async (req,res) =>{
    try{
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(404).json({message: 'Event not found'});
        res.status(200).json(event);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const updateEvent = async (req,res) =>{
    try{
        const event = await Event.findByIdAndUpdate(req.params.id, req.body , {new: true});
        if(!event) {
          return res.status(404).json({message: 'Event not found'});
        }
        res.status(200).json(event)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.json({ message: 'Event cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const registration = await Registration.findOne({ eventId: req.params.id, studentId: req.user.id });
    if (!registration) {
      return res.status(403).json({ message: 'You must be registered for this event to leave feedback' });
    }

    const existing = await Feedback.findOne({ event: req.params.id, student: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted for this event' });
    }

    const feedback = await Feedback.create({
      event: req.params.id,
      student: req.user.id,
      rating,
      comment
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getEventFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({ event: req.params.id }).populate('student', 'fullName email');
    
    let avgRating = 0;
    if (feedbackList.length > 0) {
      const sum = feedbackList.reduce((acc, curr) => acc + curr.rating, 0);
      avgRating = (sum / feedbackList.length).toFixed(1);
    }

    res.json({ averageRating: Number(avgRating), totalReviews: feedbackList.length, feedback: feedbackList });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    getSingleEvent,
    registerForEvent,
    getRegistrations,
    submitFeedback,
    getEventFeedback
}

