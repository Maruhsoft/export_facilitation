const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Company = require('../models/Company');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.generateToken = generateToken;

exports.registerUser = async (userData) => {
    const { fullName, email, password, role, companyName, cacNumber } = userData;

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    // Create a wallet for the new user
    const wallet = await Wallet.create({ user: user._id });
    user.wallet = wallet._id;

    // Create a company profile for relevant roles
    if (['buyer', 'vendor', 'freight_agency'].includes(role)) {
        const company = await Company.create({
            user: user._id,
            companyName: companyName || `${fullName}'s Company`,
            cacNumber: cacNumber || 'Not Provided'
        });
        user.company = company._id;
    }

    await user.save();
    
    const token = generateToken(user._id);
    return { user, token };
};

exports.loginUser = async (email, password) => {
    if (!email || !password) {
      // The custom error shape is handled by our errorMiddleware
      throw { statusCode: 400, message: 'Please provide an email and password' };
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }
    
    const token = generateToken(user._id);
    return { user, token };
};
