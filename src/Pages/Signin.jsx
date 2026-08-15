import  { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, Link } from "react-router-dom";
import ModernSpinner from '../SmallComponents/Spinner';

function Signin() {
  const { signIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
    navigate("/");
  };

  if (loading) return <ModernSpinner />;

  return (
                <form onSubmit={handleSubmit} className="min-h-screen bg-white flex items-center justify-center p-4 ">
                            <div className="border border-slate-300 px-10 py-7 shadow-md rounded-sm">
                                   <h1 className="my-5  text-center text-3xl font-serif font-bold">
                                        Sign In
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
                                           Sign In
                                   </button>
               
                                   <div className="flex gap-2 justify-center mt-1">
                                         <p className="font-serif">Create an account</p>
                                          <Link to='/Sign-up'>
                                                <p className="text-green-500 font-serif underline">Sign Up</p>
                                          </Link>
                                   </div>
                            </div>         
                 </form>  
  );
}

export default Signin;