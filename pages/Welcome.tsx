import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { UserIcon, VendorIcon } from '../components/icons';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex font-sans">
        <div className="hidden lg:flex w-1/2 bg-cover bg-center bg-brand-green relative" style={{ backgroundImage: "url('https://picsum.photos/1200/1200?image=996')" }}>
            <div className="absolute inset-0 bg-brand-green bg-opacity-70"></div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12">
            <div className="w-full max-w-md mx-auto">
                <div className="text-right mb-10">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a href="#/login" className="font-semibold text-brand-orange hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
                <div className="mt-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Us!</h1>
                    <p className="text-gray-500 mb-8">To begin this journey, tell us what type of account you'd be opening.</p>
                    
                    <div className="space-y-4">
                        <RoleCard 
                            icon={<UserIcon className="w-8 h-8 text-brand-green"/>}
                            title="Buyer"
                            description="Explore, connect, and import authentic products from Nigeria"
                            onClick={() => handleRoleSelect(UserRole.BUYER)}
                        />
                        <RoleCard 
                            icon={<VendorIcon className="w-8 h-8 text-brand-green"/>}
                            title="Vendor"
                            description="List your export-ready products and connect with trusted global buyers"
                            onClick={() => handleRoleSelect(UserRole.VENDOR)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

interface RoleCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, onClick }) => (
    <div onClick={onClick} className="flex items-center p-6 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-green hover:bg-green-50/50 transition-all duration-300">
        <div className="flex-shrink-0 w-16 h-16 bg-green-100/50 rounded-full flex items-center justify-center mr-6">
            {icon}
        </div>
        <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    </div>
);

export default Welcome;