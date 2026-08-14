import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import ModernSpinner from '../SmallComponents/Spinner';

function Signup() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const { signUp, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handle_Signup(e) {
    e.preventDefault();
    console.log("Signup clicked");
    await signUp(Email, Password);
    navigate("/");
  }

  if (loading) return <ModernSpinner />;

  return (
    <form onSubmit={handle_Signup} className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-black w-full max-w-md rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Sign Up</h1>
            <p className="text-sm text-gray-400 mt-1">Create your account</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-12 px-4 border-b-2 border-gray-700 focus:border-white outline-none transition-colors duration-200 bg-gray-900 text-white rounded-lg focus:bg-gray-800 placeholder-gray-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-12 px-4 border-b-2 border-gray-700 focus:border-white outline-none transition-colors duration-200 bg-gray-900 text-white rounded-lg focus:bg-gray-800 placeholder-gray-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-white to-gray-200 hover:from-gray-200 hover:to-white text-black font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign Up
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <p className="text-gray-400">Already have account?</p>
                <Link to="/Sign-in" className="font-semibold text-white hover:text-gray-300 hover:underline transition-colors">
                  Sign in
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <label htmlFor="remember" className="cursor-pointer">Remember me</label>
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 bg-gray-900 border-gray-700 rounded focus:ring-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;