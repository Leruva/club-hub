const announcementModel = require("../../models/announcementModel")

//create announcements
const createAnnouncement = async (req, res) =>{
    try{
        const announcement = await Announcement.create({
            ...req.body,
            postedBy: req.user.id,
            club: req.user.clubId
        })
        res.status(200).json(announcement);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
//update announcements
const updateAnnouncement = async (req,res) =>{
    try{
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!announcement) {
            return res.status(404).json({message: "announcement not found"});
        }
        res.status(200).json(announcement);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
//delete announcements
const deleteAnnouncement = async (req,res) =>{
    try{
        const announcement = await Announcement.findOneAndDelete({ _id: req.params.id, club: req.user.clubId});
        if(!announcement) {
            return res.status(404).json({message: "Announcement not found"});
        }
        res.status(200).json({message: "Announcement deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
//get all announcements

const getAllAnnouncements = async (req,res) =>{
    try{
        const announcements = await Announcement.find();
        res.status(200).json(announcement);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
//get single announcement
const getAnnouncement = async (req,res) =>{
    try{
        const announcement = await Announcement.findByID(req.params.id);
        if(!announcement) {
            return res.status(404).json({message: "Announcement not found"});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAllAnnouncements,
    getAnnouncement
}