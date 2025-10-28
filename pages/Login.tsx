
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { GoogleIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const { login, isLoading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    }

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-8">You can only Sign in with your Email & Password</p>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            <form onSubmit={handleLogin}>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address*</label>
                        <input type="email" placeholder="Enter email address" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 text-sm font-semibold text-gray-600">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                </div>
                 <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                    </div>
                    <div className="text-sm">
                        <Link to="/forgot-password" className="font-medium text-brand-orange hover:text-orange-500"> Forgot your password? </Link>
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold mt-8 hover:bg-opacity-90 transition-colors disabled:bg-opacity-50">
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div className="text-center my-6 text-gray-500">Or</div>
                <button type="button" className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                    <GoogleIcon />
                    Sign in with Google
                </button>
                <p className="text-center mt-8 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/" className="font-semibold text-brand-orange hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
