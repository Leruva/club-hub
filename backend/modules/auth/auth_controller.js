const { registerStudent, loginClub, loginStudent, registerClub, forgotPassword, resetPassword, updatePassword } = require("./auth_services")

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
    const result = await registerClub(req.body, req.user.id);
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

const forgotPasswordController = async (req, res) => {
  try {
    const result = await forgotPassword(req.body.email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const result = await resetPassword(req.params.token, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const result = await updatePassword(req.user.id, req.body.oldPassword, req.body.newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
    clubLogin, 
    clubRegister,
    studentRegister,
    studentLogin,
    forgotPasswordController,
    resetPasswordController,
    updatePasswordController
}