
import React from 'react';
import { BrandApeLogo } from './icons';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex w-1/2 bg-cover bg-center bg-brand-green relative" style={{ backgroundImage: "url('https://picsum.photos/1200/1200?image=1028')" }}>
        <div className="absolute inset-0 bg-brand-green bg-opacity-70"></div>
        <div className="relative z-10 p-12 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-3">
              <BrandApeLogo className="w-10 h-10" />
              <span className="text-2xl font-bold">BrandApe</span>
            </div>
          </div>
          <div className="max-w-md">
            {/* Decorative elements from design */}
            <div className="w-16 h-16 border-4 border-white opacity-50 mb-8"></div>
            <div className="grid grid-cols-5 gap-2 w-20 opacity-50">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
