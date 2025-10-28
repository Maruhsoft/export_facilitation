const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a role name'],
    unique: true,
  },
  permissions: {
    type: [String],
    required: true,
    // Example permissions: 'create_trade', 'manage_users', 'resolve_disputes'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Role', RoleSchema);
