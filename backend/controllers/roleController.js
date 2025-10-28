const Role = require('../models/Role');

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private/SuperAdmin
exports.getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, count: roles.length, data: roles });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new role
// @route   POST /api/roles
// @access  Private/SuperAdmin
exports.createRole = async (req, res, next) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a role
// @route   PATCH /api/roles/:id
// @access  Private/SuperAdmin
exports.updateRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a role
// @route   DELETE /api/roles/:id
// @access  Private/SuperAdmin
exports.deleteRole = async (req, res, next) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign permission(s) to a role
// @route   POST /api/permissions/assign
// @access  Private/SuperAdmin
exports.assignPermission = async (req, res, next) => {
  // Placeholder logic for assigning permissions
  res.status(200).json({ success: true, message: 'Permissions assigned placeholder' });
};
