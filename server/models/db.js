const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/my",{ useNewUrlParser: true });
const db=mongoose.connection;
db.on("connected", function () {
  console.log("MongoDB connected success.")
});

db.on("error", function () {
  console.log("MongoDB connected fail.")
});

db.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});
const loginSchema=mongoose.Schema({
  proe:Number,
  name:String,
  pwd:String
})
const Models={
  Login:mongoose.model('user',loginSchema)
}

module.exports=Models;
