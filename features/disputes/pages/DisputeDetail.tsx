
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { UserRole, IDispute } from '../../../types';
import DashboardLayout from '../../../components/DashboardLayout';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import FileUpload from '../../../components/ui/FileUpload';
import api from '../../../api/axios';

const DisputeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const isAdmin = user?.role === UserRole.SUPER_ADMIN || user?.role === UserRole.PAYMENT_ADMIN;

    const [dispute, setDispute] = useState<IDispute | null>(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);

    // Admin state
    const [adminStatus, setAdminStatus] = useState('');
    const [adminResolution, setAdminResolution] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchDispute = useCallback(async () => {
        if (!id) return;
        try {
            const { data } = await api.get(`/disputes/${id}`);
            setDispute(data.data);
            if (data.data) {
                setAdminStatus(data.data.status);
                setAdminResolution(data.data.resolution || '');
            }
        } catch (error) {
            console.error("Failed to fetch dispute details", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDispute();
    }, [fetchDispute]);
    
    const handleAddComment = async () => {
        if (newComment.trim() && id) {
            setIsCommenting(true);
            try {
                await api.patch(`/disputes/${id}`, { comment: newComment });
                setNewComment('');
                await fetchDispute(); // Refetch to show the new comment
            } catch (error) {
                console.error("Failed to add comment", error);
                alert("Could not post comment. Please try again.");
            } finally {
                setIsCommenting(false);
            }
        }
    };

    const handleAdminUpdate = async () => {
        if (!isAdmin || !id) return;
        setIsUpdating(true);
        try {
            await api.patch(`/disputes/${id}`, {
                status: adminStatus,
                resolution: adminResolution,
            });
            alert('Dispute updated successfully!');
            await fetchDispute();
        } catch (error) {
            console.error("Failed to update dispute", error);
            alert("Could not update dispute. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };


    if (loading) {
        return <DashboardLayout><div className="text-center">Loading dispute details...</div></DashboardLayout>;
    }

    if (!dispute) {
        return <DashboardLayout><Card>Dispute not found.</Card></DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <Card title="Communication Log">
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                             {dispute.comments.length === 0 ? (
                                <p className="text-gray-500 text-center">No messages yet.</p>
                            ) : (
                                dispute.comments.map((comment) => (
                                    <div key={comment._id} className={`flex ${comment.user._id === user?._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-lg max-w-lg ${comment.user._id === user?._id ? 'bg-brand-green text-white' : 'bg-gray-100'}`}>
                                            <p className="font-bold text-sm">{comment.user.fullName}</p>
                                            <p className="text-sm">{comment.message}</p>
                                            <p className="text-xs opacity-70 mt-1 text-right">{new Date(comment.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-6 border-t pt-4">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={3}
                                placeholder="Type your message..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green"
                            />
                            <div className="text-right mt-2">
                                <Button onClick={handleAddComment} disabled={isCommenting}>
                                    {isCommenting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {isAdmin && (
                         <Card title="Admin Actions">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                                    <select 
                                        value={adminStatus}
                                        onChange={(e) => setAdminStatus(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-brand-green focus:border-brand-green"
                                    >
                                        <option>Open</option>
                                        <option>Under Review</option>
                                        <option>Resolved</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Summary</label>
                                    <textarea 
                                        rows={4} 
                                        value={adminResolution}
                                        onChange={(e) => setAdminResolution(e.target.value)}
                                        placeholder="Enter final resolution notes..." 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green"
                                    ></textarea>
                                </div>
                                <div className="text-right">
                                    <Button onClick={handleAdminUpdate} disabled={isUpdating}>
                                        {isUpdating ? 'Saving...' : 'Save Resolution'}
                                    </Button>
                                </div>
                            </div>
                         </Card>
                    )}
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    <Card title={`Dispute #${dispute._id.slice(-8).toUpperCase()}`}>
                         <div className="space-y-3">
                            <p><strong>Trade ID:</strong> <span className="text-brand-orange">{dispute.tradeId}</span></p>
                            <p><strong>Status:</strong> <span className="px-2 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">{dispute.status}</span></p>
                            <p><strong>Reason:</strong> {dispute.reason}</p>
                            <p><strong>Raised By:</strong> {dispute.raisedBy.fullName}</p>
                            <p><strong>Date Raised:</strong> {new Date(dispute.createdAt).toLocaleDateString()}</p>
                            <div>
                                <strong>Parties Involved:</strong>
                                <ul className="list-disc list-inside ml-2">
                                    {dispute.parties.map(p => <li key={p._id}>{p.fullName}</li>)}
                                </ul>
                            </div>
                         </div>
                    </Card>
                    <Card title="Evidence Locker">
                        <div className="space-y-2">
                           {dispute.evidence.map(file => (
                               <a href={file.fileUrl} key={file._id} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 rounded-md hover:bg-gray-50 text-brand-green-light">
                                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                   {file.fileName}
                               </a>
                           ))}
                        </div>
                         <div className="mt-4 border-t pt-4">
                            <FileUpload label="Upload More Evidence" />
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DisputeDetail;
