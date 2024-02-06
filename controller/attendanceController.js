const userinfo = require('../models/attendanceModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose');

const submitAttendance = async function(req, res) {
  try {
    const { userid, date, inTimeHours, inTimeMinutes, outTimeHours, outTimeMinutes } = req.body;

    const user = await userModel.findById(userid).populate('name');
  
    
    const existingAttendance = await userinfo.findOne({ userid, date });
    if (existingAttendance) {
      return res.status(400).json({ error: 'Attendance already submitted for the day' });
    }

      const nuser = new userinfo({
      userid: user._id,
      name: user.name,
      date: new Date(date),
      inTime: user.inTime,
      outTime: user.outTime,
  });

    const informattedHours = inTimeHours < 10 ? `0${inTimeHours}` : `${inTimeHours}`;
    const informattedMinutes = inTimeMinutes < 10 ? `0${inTimeMinutes}` : `${inTimeMinutes}`;
    const outformattedHours = outTimeHours < 10 ? `0${outTimeHours}` : `${outTimeHours}`;
    const outformattedMinutes = outTimeMinutes < 10 ? `0${outTimeMinutes}` : `${outTimeMinutes}`;

    // Concatenate the formatted hours and minutes
    nuser.inTime = `${informattedHours}:${informattedMinutes}`;
    nuser.outTime = `${outformattedHours}:${outformattedMinutes}`;


    // Save the user with updated attendance
    const data = await nuser.save();
    res.json({ success: true, message: 'Attendance submitted successfully', data: data });

    



  } catch (user) {
          // Handle invalid ObjectId error
          if (user.name === 'CastError' && user.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid ObjectId' });
          }
          throw user;

    
    //Handle other errors
    //res.status(500).json({ error: error.message });
  }
};


const getAttendance= async function (req, res) {
  try {
    
    const users = await userinfo.find({});
    res.render('attendanceTable', { users }); // Assuming you are using a template engine like EJS or Handlebars
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const showdata= async (req, res) => {
    try {
        const date = req.params.date;
        const users = await userinfo.find({ date:date });
        console.log(users);
        res.render('attendanceTable', { users, date });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getStatus = async (req,res)=>{
    const user = await userinfo.findOne({name:'Sandip', date:'2024-01-25'});
    res.json("Check console")
    console.log('Duration:', user.duration);
    console.log('Attendance Status:', user.attendanceStatus);
}





module.exports = {submitAttendance,getAttendance,showdata,getStatus};
