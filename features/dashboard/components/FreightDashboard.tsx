import React from 'react';
import Card from '../../../components/ui/Card';

interface FreightDashboardProps {
  stats: {
    shipmentsInTransit: number;
    pendingQuotes: number;
    completedDeliveries: number;
  };
}

const FreightDashboard: React.FC<FreightDashboardProps> = ({ stats }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Freight Agency Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Shipments in Transit">
                    <p className="text-3xl font-bold">{stats.shipmentsInTransit}</p>
                </Card>
                <Card title="Pending Quotes">
                    <p className="text-3xl font-bold">{stats.pendingQuotes}</p>
                </Card>
                <Card title="Completed Deliveries">
                     <p className="text-3xl font-bold">{stats.completedDeliveries}</p>
                </Card>
            </div>
        </div>
    );
};

export default FreightDashboard;
