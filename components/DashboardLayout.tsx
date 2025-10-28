
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandApeLogo, SearchIcon } from './icons';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the search component
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsDropdownVisible(!!query); // Show dropdown if there is a query
    console.log('Search query:', query);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar userRole={user?.role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-600">
                  <span className="sr-only">Open sidebar</span>
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Search bar */}
              <div className="hidden md:flex flex-1 justify-center px-6">
                <div className="w-full max-w-md">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative" ref={searchContainerRef}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green sm:text-sm"
                      placeholder="Search products, orders..."
                      type="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => { if (searchQuery) setIsDropdownVisible(true); }}
                    />
                    {isDropdownVisible && (
                      <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <ul className="py-1 max-h-60 overflow-auto">
                          {/* Placeholder Search Results */}
                          <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Search result for "{searchQuery}"
                          </li>
                          <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Order #T84JHFG
                          </li>
                           <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Product: Cocoa Beans
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile and Logout */}
              <div className="flex items-center gap-4">
                 <span className="text-gray-600 hidden sm:block">
                   Welcome, <span className="font-semibold">{user?.fullName}</span>
                 </span>
                 <button
                   onClick={logout}
                   className="bg-brand-orange text-white py-2 px-4 rounded-md font-semibold hover:bg-opacity-90 transition-colors text-sm"
                 >
                   Logout
                 </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
