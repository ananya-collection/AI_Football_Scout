const mongoose= require('mongoose');

const schema= mongoose.Schema;
const userSchema= new schema({
    name:{type:String, required:true},
    Email:{type:String, unique:true, required:true},
    Password:{type:String, required:true}
})

module.exports= mongoose.model('Users',userSchema)