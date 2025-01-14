import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { Package } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    // TODO: Implement actual login logic
    console.log('Login:', data);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Package className="text-blue-600" size={48} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          OptiDeliver
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your deliveries
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm isLogin={true} onSubmit={handleLogin} />
          <div className="mt-6 text-center">
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};