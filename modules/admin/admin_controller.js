const Club = require('../../models/clubModel');

const pendingClubRequest = async (req,res) =>{
    try{    
        const clubs = await Club.findOne({status: "pending"}).select('-passwordHash');
        res.status(200).json(clubs);
    }catch(error){
        return res.status(500).json({message : error.message});
    }  
}

const approveClubRequest = async (req, res) => {
    try{
        const club = await Club.findByIdAndUpdate(
            req.params.id, {status: "approved"}, {new: true}
        ).select('-passwordHash');
        if(!club) return res.status(404).json({message: 'Club not found'});
        res.status(200).json({message: 'Club approved'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const rejectClubRequest = async (req, res) => {
    try{
        const club = await club.findByIdAndUpdate(
            req.param.id, {status: "rejected"}, {new: true}
        ).select('-passwordHash');
        if(!club) return res.status(404).json({message: 'Club not found'});
        res.status(200).json({message: 'Club approved'});
    }catch{
        res.status(500).json({message: err.message});
    }
}

const getAllClubs = async (req,res) => {
    try{
        const clubs = await Club.find().select('-passwordHash');
        res.json(clubs);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getApprovedClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ status: 'approved' }).select('-passwordHash');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRejectedClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ status: 'rejected' }).select('-passwordHash');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    pendingClubRequest,
    approveClubRequest,
    rejectClubRequest,
    getAllClubs,
    getApprovedClubs,
    getRejectedClubs
}