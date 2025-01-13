import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut, useAuthenticationStatus, useUserData } from '@nhost/react';
import { LogOut, User } from 'lucide-react';

export function Navbar() {
  const { signOut } = useSignOut();
  const { isAuthenticated } = useAuthenticationStatus();
  const user = useUserData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 text-gray-700">
              <User size={20} />
              <span>{user?.displayName || user?.email}</span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}