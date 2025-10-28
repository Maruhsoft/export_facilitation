import React from 'react';
import Card from '../../../components/ui/Card';

interface SellerDashboardProps {
  stats: {
    activeListings: number;
    newTradeRequests: number;
    fundsInEscrow: string;
  };
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ stats }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Seller Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Active Listings">
                    <p className="text-3xl font-bold">{stats.activeListings}</p>
                </Card>
                <Card title="New Trade Requests">
                    <p className="text-3xl font-bold">{stats.newTradeRequests}</p>
                </Card>
                <Card title="Funds in Escrow">
                     <p className="text-3xl font-bold">${stats.fundsInEscrow}</p>
                </Card>
            </div>
        </div>
    );
};

export default SellerDashboard;
