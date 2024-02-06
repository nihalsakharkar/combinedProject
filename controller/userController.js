const userModel = require('../models/userModel');
const { validationResult, check } = require('express-validator');

const {createUserValidation} = require('../Validators/userValidation')

//get all the users list
const getUsers= async function (req, res) {
    try {
      const users = await userModel.find();
      res.render('userTable', { users }); // Assuming you are using a template engine like EJS or Handlebars
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//get users by the role
const getUsersByRole = async function(req, res) {
    try {
      const role = req.params.role; // Assuming the role is passed as a route parameter
      const users = await userModel.find({ role: role });
      console.log(users)
      res.render('userTable', { users, role }); // Pass the role to the view
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



const createUser = async function (req, res) {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nextid = await getNextId();
    
    const { name , email, number, date, role, link } = req.body;
    const photo = req.files['photo'][0].filename;
    const resume = req.files['resume'][0].filename;
    const identityProof = req.files['identityProof'][0].filename;
    const addressProof = req.files['addressProof'][0].filename;

    const newUser = new userModel({ id: nextid, name, email, number, date, role, link, photo, resume, identityProof, addressProof });
    const savedUser = await newUser.save();
    
    res.json({message:'New user added successfully',savedUser});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







// Function to generate the next ID
async function getNextId() {
    const lastStudent = await userModel.findOne({}, {}, { sort: { 'id': -1 } });
    if (lastStudent) {
      const lastId = parseInt(lastStudent.id.substring(3), 10);
      return `RAK${String(lastId + 1).padStart(4, '0')}`;
    } else {
      return 'RAK0001';
    }
}

//updates from the front end side
const updateUser = async (req,res)=>{
  console.log(req.body)
  const {id,...rest} = req.body;
  console.log(rest)
  await userModel.updateOne({id : id},rest)
  res.send({success:true,message:'Data update successful'})
};

//delete
const deleteUser = async(req,res)=>{
  const id = req.params.id
  console.log(id)
  await userModel.deleteOne({id : id});
  res.send({success: true, message: 'Data delete successful'})

}

module.exports = {getUsers,getUsersByRole,createUser,updateUser,deleteUser};