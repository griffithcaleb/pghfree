const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: String,
  dateAndTime: String,
  location: String,
  findOutMore:String,
  eventPhoto: String,

},{timestamps:true});

const Event = mongoose.model('Event',eventSchema)

module.exports = Event
