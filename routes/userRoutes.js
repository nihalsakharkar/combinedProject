const express = require('express');
const router = express.Router();

const attendanceModel  = require("../controller/attendanceController");
const userController = require("../controller/userController");
const upload = require("../middlewares/middleware");
const {attendanceValidation,validateAttendance} = require('../Validators/attendanceValidation');
const createUserValidation = require('../Validators/userValidation')
router.get('/', userController.getUsers);
router.get('/list/:role', userController.getUsersByRole);

router.post("/create",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "identityProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
  ]),createUserValidation,
  userController.createUser
);
//for submitting attendance
router.post("/submit",attendanceValidation,validateAttendance, attendanceModel.submitAttendance);
//for viewing attendance
router.get("/getAttendance", attendanceModel.getAttendance);
// for viewing attendance for particular date
router.get('/getAttendance/:date',attendanceModel.showdata);


//update user data
router.put("/update", userController.updateUser);

//delete user data
router.delete('/delete/:id',userController.deleteUser);

router.get('/getStatus', attendanceModel.getStatus)

module.exports = router;


