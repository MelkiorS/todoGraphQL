const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  done: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  }

})

module.exports = mongoose.model('todo', schema)