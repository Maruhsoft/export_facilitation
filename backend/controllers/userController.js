const userService = require('../services/userService');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.findAllUsers();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch(error) {
        next(error);
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
    try {
        const user = await userService.findUserById(req.params.id);
        res.status(200).json({ success: true, data: user });
    } catch(error) {
        next(error);
    }
};

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createNewUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch(error) {
        next(error);
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUserById(req.params.id, req.body);
        res.status(200).json({ success: true, data: user });
    } catch(error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUserById(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch(error) {
        next(error);
    }
};
