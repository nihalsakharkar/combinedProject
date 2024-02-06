const mongoose = require('mongoose');


const schemaData = mongoose.Schema({
    id: {type:String,default: 'RAK0001',required: true,unique: true},
    name: {type:String ,validate: {
        validator: async function (value) {
          // Check if the name is unique in the collection
          const userCount = await this.constructor.countDocuments({ name: value });
          return userCount === 0;
        },
        message: 'Name must be unique',
      }, },
    email: {type:String, validate: {
      validator: async function (value) {
        // Check if the email is unique in the collection
        const userCount = await this.constructor.countDocuments({ email: value });
        return userCount === 0;
      },
      message: 'Email must be unique',
    },},
    number: {type:Number},
    date: {type:String},
    role: {type:String, enum:['backend', 'frontend', 'intern']},
    link: {type:String},
    photo: {type:String},
    resume: {type:String},
    identityProof: {type:String},
    addressProof: {type:String},  
},
{
  timestamps:true
})



const userModel = mongoose.model("user", schemaData);

module.exports = userModel;