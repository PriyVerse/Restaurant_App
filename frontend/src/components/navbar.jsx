import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { navigate, user, setUser } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left- Logo and navigation links */}
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-blue-800">
              <img src="./logo.png" alt="Logo" className="w-32" />
            </Link>
          </div>

          {/*center- Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-800">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-blue-800">
              Menu
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-800">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-800">
              Contact
            </Link>
          </div>
          {/*Right- cart and login*/}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={24} className="text-gray-700" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            {/* login and profile */}
            <div className="hidden md:block">
                {user ? (
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                     onMouseEnter={()=>setIsProfileOpen(true)}
                     onMouseLeave={()=>setIsProfileOpen(false)}
                    >
                      <img src="./user-avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" /> 
                    </button>

                    {

                        isProfileOpen && (
                            <div>
                            onMouseEnter={()=>setIsProfileOpen(true)}
                            onMouseLeave={()=>setIsProfileOpen(false)}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10"
                        )
                        
                        </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Login
                  </Link>
                )}
            </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
