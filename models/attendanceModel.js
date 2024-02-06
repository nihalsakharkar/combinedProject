
const mongoose = require('mongoose');

const userData = mongoose.Schema({
    
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {type:String, required:true},
    date: {type:Date,required:true},
    inTime:{type:String, required: true},
    outTime:{type:String, required: true}
},{
    timestamps :true,
})

userData.pre('save', function(next) {
    if (!this.date) {
        this.date = new Date;
    }
    next();
});
userData.pre('findOne', function (next) {
    this.populate('userid', 'name');
    next();
});

userData.virtual('duration').get(function () {
    const inTime = new Date(`${this.date.toDateString()} ${this.inTime}`);
    const outTime = new Date(`${this.date.toDateString()} ${this.outTime}`);
    const durationInMinutes = (outTime - inTime) / (1000 * 60);
    return durationInMinutes;
});

// Define a virtual property for attendance status
userData.virtual('attendanceStatus').get(function () {
    const duration = this.duration;
    
    if (duration < 240) {
        return 'Absent';    
    } else if (duration >= 240 && duration <= 480) {
        return 'Half Day';   
    } else {
        return 'Full Day';
    }
});

const userinfo = mongoose.model('attendance', userData)

module.exports = userinfo;
