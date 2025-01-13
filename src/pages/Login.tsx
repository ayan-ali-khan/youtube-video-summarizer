import React, { useState } from 'react';
import { useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/react';
import { useNavigate } from 'react-router-dom';
import { Lock, UserPlus, LogIn } from 'lucide-react';
import { Button } from '../components/Button';
import toast from 'react-hot-toast';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signInEmailPassword, isLoading: isSigningIn } = useSignInEmailPassword();
  const { signUpEmailPassword, isLoading: isSigningUp } = useSignUpEmailPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        const { error } = await signInEmailPassword(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUpEmailPassword(email, password);
        if (error) throw error;
      }
      
      navigate('/');
    } catch (error) {
      toast.error(isLogin ? 'Login failed' : 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            {isLogin ? (
              <LogIn size={48} className="text-blue-600" />
            ) : (
              <UserPlus size={48} className="text-blue-600" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Ayan's YouTube Video Summarizer
          </h1>

          <h2 className="text-xl font-semibold text-center text-gray-700 mb-8">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSigningIn || isSigningUp}
              isLoading={isSigningIn || isSigningUp}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}