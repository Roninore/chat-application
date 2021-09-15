const pkg = require('mongoose')
const { Schema, model } = pkg

const schema = Schema({
  id: { type: String, required: true, unique: true },
  messages: { type: Array },
})
module.exports = model('dialog', schema)
