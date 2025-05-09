import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useUserAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut, loading } = useUserAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find a Pet", path: "/pets" },
    { name: "About", path: "/about" },
  ];

  const navbarClass = isScrolled
    ? "fixed w-full bg-white shadow-md transition-all duration-300 z-50"
    : "fixed w-full bg-transparent transition-all duration-300 z-50";

  if (loading) {
    return (
      <nav className={navbarClass}>
        <div className="container-custom mx-auto py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FaPaw className="text-primary-600 text-3xl" />
              <span className="text-xl font-heading font-bold text-gray-900">
                PawMates
              </span>
            </Link>
            <div className="text-gray-700">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={navbarClass}>
      <div className="container-custom mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FaPaw className="text-primary-600 text-3xl" />
            <span className="text-xl font-heading font-bold text-gray-900">
              PawMates
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 btn-sm btn-outline">
                  <FaUser className="text-gray-700" />
                  <span>{user.name || "My Account"}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                  <div className="py-1">
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Favorites
                    </Link>
                    <Link
                      to="/applications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Applications
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-outline btn-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <div className="py-2 text-gray-700">
                    <span className="font-medium">{user.name}</span>
                  </div>

                  <Link
                    to="/favorites"
                    className="block py-2 text-gray-700 hover:text-primary-600"
                    onClick={closeMenu}
                  >
                    Favorites
                  </Link>
                  <Link
                    to="/applications"
                    className="block py-2 text-gray-700 hover:text-primary-600"
                    onClick={closeMenu}
                  >
                    My Applications
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-700 hover:text-primary-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="btn-outline btn-md w-full text-center"
                    onClick={closeMenu}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary btn-md w-full text-center"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
