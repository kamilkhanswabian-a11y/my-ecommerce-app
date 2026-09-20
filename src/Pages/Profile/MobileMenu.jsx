import {User, Mail,ShieldCheck,Calendar,LogOut,ShoppingBag,Heart,
        ShoppingCart, MapPin,Settings, Lock, ChevronRight, Package,
        CreditCard,Edit3, Menu, X,Icon, } from 'lucide-react'
import  { useState } from 'react'

function MobileMenu() {
      const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: User,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: Settings,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
  ];

    const [mobileMenu, setMobileMenu] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

const { signOut } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await signOut();
      setMobileMenu(false);
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <div>
            {/* Only Visible in Mobile  */}
            <div className='flex justify-between py-4 px-3 mx-3 mt-4 border border-slate-200 rounded-md lg:hidden'>
                <div className='flex gap-2'>
                    <User />
                    <h1 className='font-semibold'>Account Menu</h1>
                </div>
                <div>
                    <button onClick={() => setMobileMenu(!mobileMenu)}>
                        {mobileMenu ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {/* Mobile  Menu*/}

            <div>
                {mobileMenu && (
                    <div>
                        {menuItems.map((links) => {
                            const Icon = links.icon
                            return (
                                <button key={links.id}
                                    onClick={() => {
                                        setMobileMenu(false);
                                        setActiveTab(links.id)
                                    }
                                    }
                                    className={`flex justify-between w-full items-center py-4 px-3 transition duration-100 lg:hidden 
                                  ${activeTab === links.id
                                            ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
                                >
                                    <div className='flex gap-3'>
                                        <Icon></Icon>
                                        <p>{links.label}</p>
                                    </div>

                                </button>
                            )
                        })}
<button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full py-4 px-3 transition duration-100 lg:hidden hover:bg-gray-50 border-t border-slate-200 mt-4 text-red-600 font-semibold"
            >
              <LogOut size={20} />
              <p>Log Out</p>
            </button>
                    </div>
                )}
            </div>
                
        </div>
    )
}

export default MobileMenu