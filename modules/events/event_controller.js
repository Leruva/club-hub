const Event = require('../../models/eventModel');
const Registration = require('../../models/registrationModel');

const createEvent = async (req,res) =>{
    try{
        const event = await Event.create({
            ...req.body,
            clubId: req.user.id,
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

    if (event.status !== 'published') {
      return res.status(400).json({ message: 'Event is not open for registration' });
    }

    if (new Date() > event.registrationDeadline) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }

    if (event.maxParticipants && event.registrationCount >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    const registration = await Registration.create({
      eventId: req.params.id,
      studentId: req.user.id,
    });

    await Event.findByIdAndUpdate(req.params.id, {
      $inc: { registrationCount: 1 },
    });

    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ message: 'Already registered or invalid request' });
  }
};

const getRegistrations = async (req, res) => {
  const list = await Registration.find({ eventId: req.params.id }).populate('studentId', 'name email');
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
        const event = await Event.findOneByIdAndpdate(req.params.id, ...req.body , {new: true});
        if(!event)  res.status(404).json({message: 'Event not found'});
        res.status(200).json('Updated')
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

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    getSingleEvent,
    registerForEvent,
    getRegistrations,
}