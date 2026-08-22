import { Routes, Route } from "react-router-dom"
import Products from "../Pages/Products"
import Cartpage from "../Pages/Cartpage"
import Whislistpage from "../Pages/Whislistpage"
import Home from "../Pages/Home"
import Detail from "../Pages/Detail"
import Signup from "../Pages/Signup"
import ProtectedLayout from "./ProtectedLayout"
import Signin from "../Pages/Signin"
                                    //    Routes for Profile page
import Profile from "../Pages/Profile/Profile";
import Overview from "../Pages/Profile/Overview";
import Orders from "../Pages/Profile/Orders";
import Wishlist from "../Pages/Profile/Wishlist";
import Addresses from "../Pages/Profile/Addresses";
import Settings from "../Pages/Profile/Settings";
import Security from "../Pages/Profile/Security";
function Router() {
    return (
        <>
            <Routes>

                <Route path="/Sign-up" element={<Signup/>} />
                <Route path="/Sign-in" element={<Signin/>} />
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cartpage/>} />
                <Route path="/products" element={<Products />} />
                         
                          {/* {<Protected Routes */}

                <Route path="/whislist" element={<Whislistpage/>} />
                <Route path="/Detail/:id" element={<Detail/>} />

                <Route element={<ProtectedLayout />}>                            
                                 {/* Profile */}
                <Route path="/profile" element={<Profile />}>
                  <Route index element={<Overview />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="addresses" element={<Addresses />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="security" element={<Security />} />
                </Route>
                </Route>

            </Routes>
        </>
    )
}

export default Router;