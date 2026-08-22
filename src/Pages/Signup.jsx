import { useContext,  } from "react";
import { AuthContext } from "../Context/AuthContext";
import {  Link } from "react-router";
import { useNavigate } from "react-router-dom";
import ModernSpinner from '../SmallComponents/Spinner';
import { useForm } from "react-hook-form"
function Signup() {
  const { signUp, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

  async function handle_Signup(data) {
    console.log("Signup clicked",data);
   try {
      await signUp(data);
    navigate("/");
   } catch (error) {
     console.log("Sing Up Failde Please try again ",error);
   }finally{
     !loading
   }
  }

  if (loading) return <ModernSpinner />;

  return (
  <form onSubmit={handleSubmit(handle_Signup)} className="min-h-screen bg-white flex items-center justify-center p-4 ">
             <div className="border border-slate-300 px-10 py-7 shadow-md rounded-sm">
                    <h1 className="my-5  text-center text-3xl font-serif font-bold">
                         Sign Up
                    </h1>
                    <div>
                                                           {/* First Name */}
                         <div>
                          <input type="text"  className="outline-none border border-slate-300 my-2 py-1 px-1 w-full" placeholder="First Name" 
                        {...register("firstname", { required: "This field is required",
                          minLength : {value : 3, message: "Must be altleast 3 character"},
                          pattern : {value : /^[A-Za-z\s]+$/, message : "only Letter Allowed" }
                         })}
                        />
                         {errors.firstname && <p className="text-red-600 text-sm ">{errors.firstname?.message}</p>}
                         </div>
                                                           {/* First Name */}
                                                           
                         <div>
                          <input type="text"  className="outline-none border border-slate-300 my-2 py-1 px-1 w-full" placeholder="Last Name" 
                        {...register("lastname", { required: "This Field is required" ,minLength : {value : 3 , message : "Must be atleast 3 characters"},  
                        pattern : { value: /^[A-Za-z\s]+$/, message : "only Letter Allowed"}
                        })}
                        />
                         {errors.lastname && <span className="text-red-600 text-sm  h-4">{errors.lastname?.message}</span>}
                         </div>
                                                           {/* email */}
                          
                         <div>

                          <input type="email"  className="outline-none border border-slate-300 my-2 py-1 px-1 w-full" placeholder="Eamil" 
                        {...register("email", { required: "this field is required",
                          pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"enter valid email"}
                         })}
                        />
                         {errors.email && <span className="text-red-600 text-sm">{errors.email?.message}</span>}
                         </div>
                                                           {/* password */}

                    <div>
                          <input type="password" className="outline-none border border-slate-300 my-2 py-1 px-1 w-full " placeholder="Password" 
                         
                          {...register("password", { required: "This field required",
                            minLength : {value :6 ,message:"must be min 6 character" },
                            maxLength: {value:20 , message:"must me max 20 character" },
                            pattern : { value: /^(?=.*[A-Za-z])(?=.*\d)/, message:"password must contain one letter and one number "}
                           })}  
                          />
                             {errors.password && <span className="text-red-600 text-sm m h-4">{errors.password?.message}</span>}
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