import { useContext,useState } from "react"
import { AuthContext } from "../Context/AuthContext";

function Signup() {
       const [Email, setEmail] = useState('');
       const [Password, setPassword] = useState('');
      const {sign_Up,} = useContext(AuthContext)
       async function  handle_Signup(e)  {
            e.preventDefault()
            console.log("Signup clicked");
            await sign_Up(Email,Password)
       }
       
      return (
            <form action="" onSubmit={(e)=> handle_Signup(e)}>
                  <div className="flex justify-center items-center w-full h-screen bg-green-600">
                        <div className="bg-white w-[400px] h-[400px] rounded-md">
                              <div className="flex flex-col items-center  gap-4 mt-5">
                                    <div>
                                          <h1 className="text-4xl font-bold ">Sign Up</h1>
                                    </div>
                                    <div className="w-full flex flex-col  px-4">
                                          <input type="text" className="rounded-sm h-9 w-full border-b-2 outline-none my-2 " onChange={(e)=> setEmail(e.target.value)}/>
                                          <input type="password" className="rounded-sm h-9 w-full border-b-2 outline-none "  onChange={(e)=> setPassword(e.target.value)}/>
                                          <button className="w-full bg-green-600 p-2 rounded mt-4 font-semibold" >Sign Up</button>
                                          <div className="flex justify-between mt-2 mx-2">
                                                <div className="flex gap-2">
                                                      <p className="font-thin">Already have account</p>
                                                      <a href=""className=" font-semi-bold text-green-900">Sign in</a>
                                                </div>
                                                <div className="flex gap-1">
                                                      <p>Remember me</p>
                                                       <input type="checkbox" />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </form>
      )
}

export default Signup