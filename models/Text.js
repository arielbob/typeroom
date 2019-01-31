const mongoose = require('mongoose')

var textSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true
  }
})

var Text = mongoose.model('Text', textSchema)

module.exports = Text
