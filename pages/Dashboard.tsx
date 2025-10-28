import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <div className="bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
                <p className="text-lg text-gray-600 mb-6">
                    This is a placeholder for your role-specific dashboard content.
                </p>
                <div className="border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4">Your Profile Details</h2>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        <dt className="font-medium text-gray-500">Full Name</dt>
                        <dd className="text-gray-900">{user?.fullName}</dd>
                        <dt className="font-medium text-gray-500">Email Address</dt>
                        <dd className="text-gray-900">{user?.email}</dd>
                        <dt className="font-medium text-gray-500">Role</dt>
                        <dd className="text-gray-900 capitalize">{user?.role}</dd>
                    </dl>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;