import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

interface BuyerDashboardProps {
  stats: {
    activeTrades: number;
    pendingPayments: number;
    unreadMessages: number;
  },
  recentActivity: {
      _id: string;
      message: string;
  }[]
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ stats, recentActivity }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold text-gray-800">Your Dashboard</h1>
                 <Button onClick={() => navigate('/trades/new')}>
                    Start a New Trade
                </Button>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Active Trades">
                    <p className="text-3xl font-bold">{stats.activeTrades}</p>
                    <p className="text-sm text-gray-500 mt-1">Awaiting action</p>
                </Card>
                <Card title="Pending Payments">
                    <p className="text-3xl font-bold">{stats.pendingPayments}</p>
                    <p className="text-sm text-gray-500 mt-1">Escrow deposit required</p>
                </Card>
                <Card title="Unread Messages">
                     <p className="text-3xl font-bold">{stats.unreadMessages}</p>
                     <p className="text-sm text-gray-500 mt-1">From vendors</p>
                </Card>
            </div>

            <div className="mt-8">
                <Card title="Recent Activity">
                    {recentActivity && recentActivity.length > 0 ? (
                        <ul>
                            {recentActivity.slice(0, 5).map(activity => (
                                <li key={activity._id} className="py-2 border-b last:border-b-0">{activity.message}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No recent activity.</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default BuyerDashboard;
