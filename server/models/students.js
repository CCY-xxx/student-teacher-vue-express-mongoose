var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  "proe":Number,
  "stuid" : String,
  "stupwd" : String,
  "name" : String,
  "nameId" : String,
  "age" : String,
  "sex" : String,
  "grade" : String,
  "subject" : String,
  "score":[
    {
      "scoreId":String,
    "Math":Number,
    "English":Number,
    "Chinese":Number,
    "sport":Number,
    "Computer":Number
    }
]
});

module.exports = mongoose.model('Students',studentSchema);
