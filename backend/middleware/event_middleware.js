const Event  = require('../models/eventModel');
const Announcement = require('../models/announcementModel');

const checkEventOwnership = async (
   req,
   res,
   next
) => {

   try {

      const event = await Event.findById(
         req.params.id
      );

      if(!event){
         return res.status(404).json({
            message: 'Event not found'
         });
      }

      if(
         event.clubId.toString() !==
         req.user.clubId
      ){
         return res.status(403).json({
            message: 'Unauthorized access'
         });
      }

      req.event = event;

      next();

   } catch(err){

      res.status(500).json({
         message: err.message
      });

   }
};



const requireAnnouncementOwnership = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    if (announcement.club.toString() !== req.user.clubId) {
      return res.status(403).json({ message: 'You can only access announcements of your club' });
    }
    req.announcement = announcement;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { checkEventOwnership, requireAnnouncementOwnership };