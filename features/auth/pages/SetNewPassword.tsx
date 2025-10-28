
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const SetNewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Handle password reset logic
            navigate('/login');
        } else {
            alert("Passwords don't match!");
        }
    }

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold mb-2">Set New Password</h1>
            <p className="text-gray-500 mb-8">Must be at least 6 characters</p>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input 
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 text-sm font-semibold text-gray-600">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
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

export default SetNewPassword;
