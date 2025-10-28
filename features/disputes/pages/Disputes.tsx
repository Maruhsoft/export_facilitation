
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import api from '../../../api/axios';
import { IDispute } from '../../../types';

const statusStyles: { [key: string]: string } = {
    Open: 'bg-red-100 text-red-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-green-100 text-green-800',
};

const Disputes: React.FC = () => {
    const navigate = useNavigate();
    const [disputes, setDisputes] = useState<IDispute[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDisputes = async () => {
            try {
                const { data } = await api.get('/disputes');
                setDisputes(data.data);
            } catch (error) {
                console.error('Failed to fetch disputes', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDisputes();
    }, []);

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold text-gray-800">Dispute Management</h1>
            </div>
            
            <Card>
                {loading ? (
                    <div className="text-center p-8">Loading disputes...</div>
                ) : disputes.length === 0 ? (
                    <div className="text-center p-8">
                        <h3 className="text-lg font-medium text-gray-900">No disputes found</h3>
                        <p className="mt-1 text-sm text-gray-500">You have not raised or been involved in any disputes.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispute ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raised By</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Raised</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {disputes.map((dispute) => (
                                    <tr key={dispute._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dispute._id.slice(-8).toUpperCase()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.tradeId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.reason.replace(/_/g, ' ')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[dispute.status]}`}>
                                                {dispute.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.raisedBy.fullName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(dispute.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="outline" className="py-1 px-3 text-sm" onClick={() => navigate(`/disputes/${dispute._id}`)}>
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </DashboardLayout>
    );
};

export default Disputes;
