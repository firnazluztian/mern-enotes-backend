  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: {
    type: String,
    required: false,
    unique: false,
  },
  content: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;