import React, { useContext } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import ModernSpinner from '../SmallComponents/Spinner';

function Profile() {
  const { user, signOut , loading } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/Sign-in");
  }
   
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Please login to view profile
        </p>
      </div>
    );
  }
     if(loading) return (<ModernSpinner></ModernSpinner>)
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4 py-10">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition mb-8"
        >
          <ArrowLeft size={20} />
          Back Home
        </Link>


        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">


          {/* Header */}
          <div className="h-40 bg-gradient-to-r from-indigo-600 to-purple-600 relative">

            <div className="absolute -bottom-14 left-8">

              <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center">

                <User
                  size={55}
                  className="text-indigo-600"
                />

              </div>

            </div>

          </div>



          {/* Content */}
          <div className="pt-20 px-8 pb-8">


            <h1 className="text-3xl font-bold text-gray-900">
              {user.user_metadata?.name || "User Profile"}
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back 👋
            </p>



            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-5 mt-8">


              {/* Email */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">

                <div className="p-3 rounded-xl bg-indigo-100">
                  <Mail className="text-indigo-600" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold text-gray-800 break-all">
                    {user.email}
                  </p>
                </div>

              </div>




              {/* Status */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">

                <div className="p-3 rounded-xl bg-green-100">
                  <Shield className="text-green-600" />
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Account Status
                  </p>

                  <p className="font-semibold text-green-600">
                    Verified
                  </p>

                </div>

              </div>





              {/* Created */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">

                <div className="p-3 rounded-xl bg-purple-100">
                  <Calendar className="text-purple-600" />
                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    Joined
                  </p>

                  <p className="font-semibold text-gray-800">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>

                </div>


              </div>





              {/* User ID */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">

                <div className="p-3 rounded-xl bg-orange-100">
                  <User className="text-orange-600" />
                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    User ID
                  </p>

                  <p className="font-semibold text-gray-800 truncate">
                    {user.id.slice(0, 12)}...
                  </p>

                </div>

              </div>


            </div>




            {/* Logout */}
            <button
              onClick={handleLogout}
              className="
              mt-10
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-red-500
              hover:bg-red-600
              text-white
              py-4
              rounded-2xl
              font-semibold
              transition
              shadow-lg
              "
            >

              <LogOut size={20} />
              Logout

            </button>


          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;