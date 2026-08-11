import { Routes, Route } from "react-router-dom"
import Products from "../Pages/Products"
import Cartpage from "../Pages/Cartpage"
import Whislistpage from "../Pages/whislistpage"
import Home from "../Pages/Home"
import Detail from "../Pages/Detail"
import Signup from "../Pages/Signup"
import ProtectedLayout from "./ProtectedLayout"
import Signin from "../Pages/Signin"
import Profile from "../Pages/Profile"

function Router() {
    return (
        <>
            <Routes>
                <Route path="/Sign-up" element={<Signup/>} />
                <Route path="/Sign-in" element={<Signin/>} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                                          {/* {<Protected Routes */}
                <Route path="/Profile" element={<Profile />} />
                                                  
                <Route element={<ProtectedLayout />}>
                <Route path="/cart" element={<Cartpage/>} />
                <Route path="/whislist" element={<Whislistpage/>} />
                <Route path="/Detail/:id" element={<Detail/>} />
                </Route>
            </Routes>
        </>
    )
}

export default Router