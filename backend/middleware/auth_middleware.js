const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message : "no token provided"});
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({message: 'Invalid or expired token'});
    }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

const requireAccountType = (...types) => {
  return (req, res, next) => {
    if (!req.user || !types.includes(req.user.type)) {
      return res.status(403).json({ message: 'Invalid account type' });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  requireRole,
  requireAccountType,
};