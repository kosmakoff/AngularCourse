var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    _id: Number,
    name: String,
    grade: String,
    job: String,
    age: Number
});

module.exports = mongoose.model('Employee', EmployeeSchema);
