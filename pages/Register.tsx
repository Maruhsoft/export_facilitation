
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { BackArrowIcon, GoogleIcon } from '../components/icons';
import FileUpload from '../components/FileUpload';

// Interfaces remain for future multi-step implementation
interface PersonalInfoFormProps {
    userRole: UserRole | null;
    onSubmit: (e: React.FormEvent) => void;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    error: string | null;
}

const Register = () => {
    const { userRole, register, isLoading, error } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!userRole) {
            navigate('/');
        }
    }, [userRole, navigate]);
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({
            fullName,
            email,
            password,
            role: userRole
        });
    };

    const handleBack = () => {
        // For now, always go back to welcome page from step 1
        navigate('/');
    };
    
    // Multi-step logic is kept for future expansion but simplified for now.
    // The current implementation only uses step 1 for registration.

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-8">
                <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900">
                    <BackArrowIcon className="w-5 h-5 mr-2" /> Back
                </button>
                <div className="text-right">
                    <p className="text-sm text-gray-500">STEP 01/01</p>
                    <p className="font-medium text-gray-700">Personal Info.</p>
                </div>
            </div>
            
            <form onSubmit={handleRegister}>
                <h1 className="text-3xl font-bold mb-2">Register {userRole === UserRole.BUYER ? 'Individual' : 'Vendor'} Account!</h1>
                <p className="text-gray-500 mb-8">For the purpose of industry regulation, your details are required.</p>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your fullname*</label>
                        <input type="text" placeholder="Invictus Innocent" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" value={fullName} onChange={e => setFullName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address*</label>
                        <input type="email" placeholder="Enter email address" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Create password*</label>
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
                <div className="flex items-center mt-6">
                    <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded" />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to terms & conditions
                    </label>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold mt-8 hover:bg-opacity-90 transition-colors disabled:bg-opacity-50">
                    {isLoading ? 'Registering...' : 'Register Account'}
                </button>
                <div className="text-center my-6 text-gray-500">Or</div>
                <button type="button" className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                    <GoogleIcon />
                    Register with Google
                </button>
            </form>

        </AuthLayout>
    );
};

export default Register;
