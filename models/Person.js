const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const PersonSchema = new Schema({
    name :{
        type: String,
        
    },
    email : {
        type: String,
        required :true
    },
    password:{
        type: String,
        required :true
    },
    username:{
        type: String
    },
    profilepic:{
        type: String,
        default :"https://www.nicepng.com/ourpic/u2e6t4t4w7e6u2i1_boy-comments-man-icon-png/"
    },
    date:{
        type: Date,
        default : Date.now
    }


})
Person = mongoose.model("myPerson",PersonSchema);

module.exports = Person ;