import React, { useContext } from 'react';
import { User, Mail, Shield, Calendar, LogOut, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

function Profile() {
  const { user, sign_Out } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (sign_Out) {
      await sign_Out();
      navigate('/Sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition duration-200"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Account Settings
          </span>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Avatar & Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              <User size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100">
                {user?.email ? user.email.split('@')[0] : 'User Profile'}
              </h1>
              <p className="text-sm text-slate-400">
                Manage your account preferences and details
              </p>
            </div>
          </div>

          {/* Account Details List */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Information
            </h2>

            {/* Email item */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Email Address</p>
                  <p className="text-sm font-medium text-slate-200">
                    {user?.email || 'Not logged in'}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700/50">
                Verified
              </span>
            </div>

            {/* User ID / Role */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Account ID</p>
                  <p className="text-sm font-mono text-slate-300 truncate max-w-[180px] sm:max-w-xs">
                    {user?.id || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Member Since</p>
                  <p className="text-sm font-medium text-slate-300">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
             
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-xl text-sm font-medium border border-slate-700/60 transition duration-200"
            >
              <LogOut size={16} />
              <span  onClick={handleSignOut}>Sign Out</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;