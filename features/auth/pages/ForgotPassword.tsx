
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send reset link
        navigate('/set-new-password');
    }

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
            <p className="text-gray-500 mb-8">No worries, we will send reset instructions</p>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address*</label>
                        <input type="email" placeholder="Enter email address" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold mt-8 hover:bg-opacity-90 transition-colors">
                    Reset Password
                </button>
                <div className="text-center mt-8">
                    <Link to="/login" className="font-semibold text-gray-600 hover:text-gray-900">
                        Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
