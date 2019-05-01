const mongoose=require('mongoose')
var Schema = mongoose.Schema;
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

var stuSchema = new Schema({
  proe:Number,
  stuid : String,
  stupwd : String,

});

module.exports = mongoose.model('stus',stuSchema);
