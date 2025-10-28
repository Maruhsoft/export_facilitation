import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';
import DashboardLayout from '../../../components/DashboardLayout';
import BuyerDashboard from '../components/BuyerDashboard';
import SellerDashboard from '../components/SellerDashboard';
import AdminDashboard from '../components/AdminDashboard';
import FreightDashboard from '../components/FreightDashboard';
import PaymentAdminDashboard from '../components/PaymentAdminDashboard';
import api from '../../../api/axios';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                let statsEndpoint = '';
                let dashboardStats: any = {};

                // Fetch notifications for roles that need them
                if (user.role === UserRole.BUYER) {
                    try {
                        const notificationsRes = await api.get('/notifications');
                        setNotifications(notificationsRes.data.data);
                    } catch (e) {
                        console.error("Could not fetch notifications", e);
                    }
                }

                switch (user.role) {
                    case UserRole.SUPER_ADMIN:
                        statsEndpoint = '/admin/overview';
                        break;
                    case UserRole.PAYMENT_ADMIN:
                        statsEndpoint = '/dashboard/payment-admin';
                        break;
                    case UserRole.BUYER:
                        statsEndpoint = '/dashboard/buyer';
                        break;
                    case UserRole.VENDOR:
                        statsEndpoint = '/dashboard/seller';
                        break;
                    case UserRole.FREIGHT_AGENCY:
                         // Placeholder data as shipment API is not fully implemented
                        dashboardStats = {
                            shipmentsInTransit: 12,
                            pendingQuotes: 4,
                            completedDeliveries: 128,
                        };
                        break;
                    default:
                        break;
                }

                if (statsEndpoint) {
                    const res = await api.get(statsEndpoint);
                    dashboardStats = res.data.data;
                }
                
                setStats(dashboardStats);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
                setStats({}); // Set empty stats on error
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    const renderDashboardByRole = () => {
        if (loading || !stats) {
            return <div className="text-center p-8">Loading dashboard...</div>;
        }

        switch (user?.role) {
            case UserRole.BUYER:
                return <BuyerDashboard stats={stats} recentActivity={notifications} />;
            case UserRole.VENDOR:
                return <SellerDashboard stats={stats} />;
            case UserRole.SUPER_ADMIN:
                 return <AdminDashboard stats={stats} />;
            case UserRole.PAYMENT_ADMIN:
                 return <PaymentAdminDashboard stats={stats} />;
            case UserRole.FREIGHT_AGENCY:
                return <FreightDashboard stats={stats} />;
            default:
                return <div className="bg-white p-8 rounded-lg shadow">
                    <h1 className="text-2xl font-bold">Welcome, {user?.fullName}</h1>
                    <p>Your dashboard is being prepared.</p>
                </div>;
        }
    };

    return (
        <DashboardLayout>
            {renderDashboardByRole()}
        </DashboardLayout>
    );
};

export default Dashboard;
