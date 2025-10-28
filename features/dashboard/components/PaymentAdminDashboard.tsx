import React from 'react';
import Card from '../../../components/ui/Card';

interface PaymentAdminDashboardProps {
  stats: {
    pendingManualPayments: number;
    completedTransactionsToday: number;
    totalEscrowed: number;
  };
}

const PaymentAdminDashboard: React.FC<PaymentAdminDashboardProps> = ({ stats }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Pending Manual Payments">
                    <p className="text-3xl font-bold">{stats.pendingManualPayments}</p>
                </Card>
                <Card title="Completed Transactions (Today)">
                    <p className="text-3xl font-bold">{stats.completedTransactionsToday}</p>
                </Card>
                <Card title="Total Funds in Escrow">
                     <p className="text-3xl font-bold">${stats.totalEscrowed.toFixed(2)}</p>
                </Card>
            </div>
        </div>
    );
};

export default PaymentAdminDashboard;
