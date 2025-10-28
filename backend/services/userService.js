const User = require('../models/User');

exports.findAllUsers = async () => {
    return User.find();
};

exports.findUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw { statusCode: 404, message: `No user with the id of ${id}` };
    }
    return user;
};

exports.createNewUser = async (userData) => {
    // Note: This is a simplified creation for admins.
    // It bypasses wallet/company creation logic from the main registration flow.
    return User.create(userData);
};

exports.updateUserById = async (id, userData) => {
    const user = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true
    });
    if (!user) {
        throw { statusCode: 404, message: `No user with the id of ${id}` };
    }
    return user;
};

exports.deleteUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw { statusCode: 404, message: `No user with the id of ${id}` };
    }
    await user.deleteOne();
};
