
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';
import { BackArrowIcon, GoogleIcon } from '../../../components/icons';
import FileUpload from '../../../components/ui/FileUpload';

const Register = () => {
    const { userRole, register, isLoading, error } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Step 1: Personal Info
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Step 2: Business Info
    const [companyName, setCompanyName] = useState('');
    const [cacNumber, setCacNumber] = useState('');

    useEffect(() => {
        if (!userRole) {
            navigate('/');
        }
    }, [userRole, navigate]);
    
    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would also handle file uploads
        await register({
            fullName,
            email,
            password,
            role: userRole,
            companyName,
            cacNumber,
        });
    };

    const handleBack = () => {
        if (step === 1) {
            navigate('/');
        } else {
            handlePrevStep();
        }
    };
    
    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-8">
                <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900">
                    <BackArrowIcon className="w-5 h-5 mr-2" /> Back
                </button>
                <div className="text-right">
                    <p className="text-sm text-gray-500">STEP 0{step}/02</p>
                    <p className="font-medium text-gray-700">{step === 1 ? 'Personal Info.' : 'Business Info.'}</p>
                </div>
            </div>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            {step === 1 && (
                <form onSubmit={handleNextStep}>
                    <h1 className="text-3xl font-bold mb-2">Register {userRole === UserRole.BUYER ? 'Individual' : 'Vendor'} Account!</h1>
                    <p className="text-gray-500 mb-8">For the purpose of industry regulation, your details are required.</p>
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
                    <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold mt-8 hover:bg-opacity-90 transition-colors">
                        Next Step
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleRegister}>
                    <h1 className="text-3xl font-bold mb-2">Business Information</h1>
                    <p className="text-gray-500 mb-8">Please provide your company details for verification.</p>
                    <div className="space-y-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                            <input type="text" placeholder="Your Company LLC" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CAC Registration Number*</label>
                            <input type="text" placeholder="RC123456" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" value={cacNumber} onChange={e => setCacNumber(e.target.value)} />
                        </div>
                        <FileUpload label="Upload Certificate of Incorporation*" />
                        <FileUpload label="Upload Proof of Address*" />
                    </div>
                     <button type="submit" disabled={isLoading} className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold mt-8 hover:bg-opacity-90 transition-colors disabled:bg-opacity-50">
                        {isLoading ? 'Registering...' : 'Register Account'}
                    </button>
                </form>
            )}

            <div className="text-center my-6 text-gray-500">Or</div>
            <button type="button" className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                <GoogleIcon />
                Register with Google
            </button>

        </AuthLayout>
    );
};

export default Register;
