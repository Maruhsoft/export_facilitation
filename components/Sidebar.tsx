
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../types';
import { BrandApeLogo, DashboardIcon, TradesIcon, PaymentsIcon, ProfileIcon, SettingsIcon, DisputesIcon } from './icons';

interface SidebarProps {
  userRole?: UserRole | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navLinks = {
  [UserRole.BUYER]: [
    { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { to: '/trades', label: 'My Trades', icon: TradesIcon },
    { to: '/payments', label: 'Payments', icon: PaymentsIcon },
    { to: '/profile', label: 'Profile', icon: ProfileIcon },
  ],
  [UserRole.VENDOR]: [
    { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { to: '/listings', label: 'My Listings', icon: TradesIcon },
    { to: '/trades', label: 'Active Trades', icon: TradesIcon },
    { to: '/payments', label: 'Earnings', icon: PaymentsIcon },
    { to: '/profile', label: 'Profile', icon: ProfileIcon },
  ],
  [UserRole.SUPER_ADMIN]: [
    { to: '/dashboard', label: 'Overview', icon: DashboardIcon },
    { to: '/users', label: 'Manage Users', icon: ProfileIcon },
    { to: '/trades', label: 'All Trades', icon: TradesIcon },
    { to: '/disputes', label: 'Disputes', icon: DisputesIcon },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
  ],
  [UserRole.PAYMENT_ADMIN]: [
    { to: '/dashboard', label: 'Overview', icon: DashboardIcon },
    { to: '/payments', label: 'Payments', icon: PaymentsIcon },
    { to: '/disputes', label: 'Disputes', icon: DisputesIcon },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
  ],
  [UserRole.FREIGHT_AGENCY]: [
    { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { to: '/trades', label: 'Shipments', icon: TradesIcon },
    { to: '/profile', label: 'Profile', icon: ProfileIcon },
  ],
};

const SidebarContent: React.FC<{ userRole?: UserRole | null }> = ({ userRole }) => {
  const getLinksForRole = (role: UserRole) => {
    switch (role) {
      case UserRole.BUYER:
        return navLinks.buyer;
      case UserRole.VENDOR:
        return navLinks.vendor;
      case UserRole.SUPER_ADMIN:
        return navLinks.superadmin;
      case UserRole.PAYMENT_ADMIN:
        return navLinks.payment_admin;
      case UserRole.FREIGHT_AGENCY:
        return navLinks.freight_agency;
      default:
        return [];
    }
  }

  const links = userRole ? getLinksForRole(userRole) : [];

  return (
    <div className="flex flex-col h-full bg-brand-green text-white">
      <div className="flex items-center justify-center h-16 border-b border-brand-green-light flex-shrink-0">
        <div className="flex items-center gap-3">
          <BrandApeLogo className="w-8 h-8" />
          <span className="text-xl font-bold">BrandApe</span>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-brand-green-light text-white'
                  : 'text-green-100 hover:bg-brand-green-light hover:text-white'
              }`
            }
          >
            <Icon className="mr-3 h-6 w-6" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ userRole, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile sidebar with overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setIsOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="sr-only">Close sidebar</span>
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <SidebarContent userRole={userRole} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent userRole={userRole} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
