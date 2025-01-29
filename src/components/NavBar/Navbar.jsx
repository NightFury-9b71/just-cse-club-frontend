import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import api from "../../api";
import Notification from "../../components/Notification/Notification";
import img from "../../assets/images/logo/JUST_CSE_Club_logo_main.jpg";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(false);
  const [notification, setNotification] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/home", label: "Home" },
    { path: "/blogs", label: "Blogs" },
    { path: "/events", label: "Events" },
    { path: "/notices", label: "Notices" },
    { path: "/treasury", label: "Treasury" },
    { path: "/about", label: "About" },
  ];

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) setLoggedIn(true);
    
    const handleAdminStatus = async () => {
      try {
        await api.post("api/verify/admin/");
        setAdminUser(true);
      } catch (error) {
        setAdminUser(false);
        console.error(error);
      }
    };
    
    handleAdminStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setLoggedIn(false);
    setNotification("Logout successful! Redirecting...");
    setTimeout(() => {
      setAdminUser(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 shadow-xl">
      {notification && (
        <Notification message={notification} onClose={() => setNotification("")} />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full transform transition-transform hover:scale-110"
                src={img}
                alt="JUST CSE Club"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname.startsWith(item.path) || (item.path === "/home" && location.pathname === "/")
                      ? "bg-[rgb(88,91,101)] text-white"
                      : "text-gray-300 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {adminUser && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname.startsWith("/admin")
                      ? "bg-purple-700 text-white"
                      : "text-gray-300 hover:bg-purple-800 hover:text-white"
                  }`}
                >
                  Admin Dashboard
                </Link>
              )}
              
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-green-700 text-white transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-800"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.startsWith(item.path)
                  ? "bg-[rgb(88,91,101)] text-white"
                  : "text-gray-300 hover:bg-blue-800 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {adminUser && (
            <Link
              to="/admin"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.startsWith("/admin")
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          
          {loggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium  text-white "
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;