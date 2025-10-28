
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Welcome from './features/auth/pages/Welcome';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import SetNewPassword from './features/auth/pages/SetNewPassword';
import VerifyCode from './features/auth/pages/VerifyCode';
import Dashboard from './features/dashboard/pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import Trades from './features/trades/pages/Trades';
import NewTrade from './features/trades/pages/NewTrade';
import TradeDetail from './features/trades/pages/TradeDetail';
import Disputes from './features/disputes/pages/Disputes';
import NewDispute from './features/disputes/pages/NewDispute';
import DisputeDetail from './features/disputes/pages/DisputeDetail';
import Payments from './features/payments/pages/Payments';
import Listings from './features/listings/pages/Listings';
import Users from './features/users/pages/Users';
import Settings from './features/settings/pages/Settings';
import Profile from './features/profile/pages/Profile';
import { UserRole } from './types';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trades" 
            element={
              <ProtectedRoute>
                <Trades />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trades/new" 
            element={
              <ProtectedRoute roles={[UserRole.BUYER]}>
                <NewTrade />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/trades/:id" 
            element={
              <ProtectedRoute>
                <TradeDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/disputes" 
            element={
              <ProtectedRoute>
                <Disputes />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/disputes/new" 
            element={
              <ProtectedRoute>
                <NewDispute />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/disputes/:id" 
            element={
              <ProtectedRoute>
                <DisputeDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payments" 
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/listings" 
            element={
              <ProtectedRoute roles={[UserRole.VENDOR]}>
                <Listings />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/users" 
            element={
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <Users />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/settings" 
            element={
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN, UserRole.PAYMENT_ADMIN]}>
                <Settings />
              </ProtectedRoute>
            } 
          />
           <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
