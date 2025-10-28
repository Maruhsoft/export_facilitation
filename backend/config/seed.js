const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/Role');
const User = require('../models/User');
const Setting = require('../models/Setting');
const connectDB = require('./db');

// Load env vars
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const seedData = async () => {
    try {
        await connectDB();
        
        console.log('Seeding data...');

        // Clear existing data
        await Role.deleteMany();
        await User.deleteMany({ role: 'superadmin' });
        await Setting.deleteMany();

        // Seed Roles
        const roles = [
            { name: 'superadmin', permissions: ['manage_all'] },
            { name: 'payment_admin', permissions: ['manage_payments', 'resolve_disputes'] },
            { name: 'buyer', permissions: ['create_trade', 'view_offers'] },
            { name: 'vendor', permissions: ['create_offer', 'manage_listings'] },
            { name: 'freight_agency', permissions: ['manage_shipments'] },
        ];
        await Role.insertMany(roles);
        console.log('Roles seeded.');

        // Seed Super Admin User
        await User.create({
            fullName: 'Super Admin',
            email: process.env.ADMIN_EMAIL || 'admin@brandape.com',
            password: process.env.ADMIN_PASSWORD || 'password123',
            role: 'superadmin',
            isVerified: true
        });
        console.log('Super Admin user created.');

        // Seed Settings
        const settings = [
            { key: 'escrow_fee_percentage', value: 2.5, description: 'Percentage fee charged for escrow services.' },
            { key: 'site_name', value: 'BrandApe', description: 'Public name of the website.' },
        ];
        await Setting.insertMany(settings);
        console.log('Settings seeded.');

        console.log('Data seeded successfully!');
    } catch (err) {
        console.error(err);
    } finally {
        if (require.main !== module) { // Don't close connection if called from controller
           return;
        }
        mongoose.connection.close();
    }
};

// To run directly: node backend/config/seed.js
if (require.main === module) {
    seedData();
}

module.exports = { seedData };
