const { registerStudent, loginClub, loginStudent, registerClub } = require("./auth_services")

const studentRegister = async (req, res) =>{
    try{
        const token = await registerStudent(req.body);
        res.status(201).json({token});
    }catch(err){
        res.status(400).json({message : err.message});
    }
}

const studentLogin = async (req, res) => {
  try {
    const token = await loginStudent(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const clubRegister = async (req, res) => {
  try {
    const result = await registerClub(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const clubLogin = async (req, res) => {
  try {
    const token = await loginClub(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
    clubLogin, 
    clubRegister,
    studentRegister,
    studentLogin
}