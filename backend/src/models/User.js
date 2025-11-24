const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, // No permite emails repetidos
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);