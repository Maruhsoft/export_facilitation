
import React from 'react';
import Card from '../../../components/ui/Card';

interface AdminDashboardProps {
  stats: {
    totalUsers: number;
    pendingVerifications: number;
    openDisputes: number;
    totalTrades: number;
  };
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Total Users">
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </Card>
                <Card title="Pending Verifications">
                    <p className="text-3xl font-bold">{stats.pendingVerifications}</p>
                </Card>
                <Card title="Open Disputes">
                    <p className="text-3xl font-bold">{stats.openDisputes}</p>
                </Card>
                <Card title="Total Trades">
                     <p className="text-3xl font-bold">{stats.totalTrades}</p>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
