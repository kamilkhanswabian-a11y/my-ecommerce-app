import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {  Link } from "react-router";
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
  <form onSubmit={handle_Signup} className="min-h-screen bg-white flex items-center justify-center p-4 ">
             <div className="border border-slate-300 px-10 py-7 shadow-md rounded-sm">
                    <h1 className="my-5  text-center text-3xl font-serif font-bold">
                         Sign Up
                    </h1>
                    <div>
                         <div>
                          <input type="text"  className="outline-none border border-slate-300 my-3 py-1 px-1 w-full" placeholder="Name" onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div>
                          <input type="password" className="outline-none border border-slate-300 my-3 py-1 px-1 w-full " placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    </div>
                    <div className="flex justify-between gap-8">
                          <div className="flex gap-1">
                               <input type="checkbox" />
                               <p className="font-serif">Remember Me</p>  
                          </div>
                          <div>
                               <a href="" className="text-green-500 underline font-serif">Forget Password</a>
                          </div>
                    </div>
                    <button className="border border-black w-full mt-3 bg-black text-white font-bold font-serif py-1 rounded-sm">
                            Sign Up
                    </button>

                    <div className="flex gap-2 justify-center mt-1">
                          <p className="font-serif">Already have an account</p>
                           <Link to='/Sign-in'>
                                 <p className="text-green-500 font-serif underline">Sign In</p>
                           </Link>
                    </div>
             </div>         
  </form>  
  );
}

export default Signup;