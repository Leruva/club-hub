const Club = require('../../models/clubModel');
const Event = require('../../models/eventModel');
const ClubMember =
   require('../../models/clubMemberModel');


// CLUBS

const getPendingClubs = async () => {

   return await Club.find({
      'approval.status': 'pending'
   });

};


const approveClub = async (
   clubId,
   adminId
) => {

   const club = await Club.findById(clubId);

   if(!club){
      throw new Error('Club not found');
   }

   club.approval.status = 'approved';

   club.approval.reviewedBy = adminId;

   club.approval.reviewedAt = new Date();

   await club.save();


   // CREATE PRESIDENT MEMBERSHIP
   await ClubMember.create({

      user: club.createdBy,

      club: club._id,

      role: 'president'

   });

   return {
      message: 'Club approved successfully'
   };
};


const rejectClub = async (
   clubId,
   rejectionReason,
   adminId
) => {

   const club = await Club.findById(clubId);

   if(!club){
      throw new Error('Club not found');
   }

   club.approval.status = 'rejected';

   club.approval.rejectionReason =
      rejectionReason;

   club.approval.reviewedBy = adminId;

   club.approval.reviewedAt = new Date();

   await club.save();

   return {
      message: 'Club rejected'
   };
};


// EVENTS

const getPendingEvents = async () => {

   return await Event.find({
      status: 'pendingApproval'
   });

};

const approveEvent = async (eventId) => {
   const event = await Event.findByIdAndUpdate(
      eventId,
      { status: 'approved' },
      { new: true }
   );

   if (!event) {
      throw new Error('Event not found');
   }

   return {
      message: 'Event approved'
   };
};

const rejectEvent = async (eventId, rejectionReason) => {
   const event = await Event.findByIdAndUpdate(
      eventId,
      { 
         status: 'rejected',
         rejectionReason: rejectionReason 
      },
      { new: true }
   );

   if (!event) {
      throw new Error('Event not found');
   }

   return {
      message: 'Event rejected'
   };
};


module.exports = {
   getPendingClubs,
   approveClub,
   rejectClub,
   getPendingEvents,
   approveEvent,
   rejectEvent
};