import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw, FaEnvelope, FaLock } from "react-icons/fa";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useUserAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn, setUser } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      return setError("Email is required");
    }
    if (!password) {
      return setError("Password is required");
    }

    try {
      setLoading(true);
      
      // Authenticate user with Firebase
      const userCredential = await logIn(email, password);
      
      // Fetch user details from our MongoDB backend
      const response = await fetch(`http://localhost:5000/loggedinuser?email=${email}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      const userData = await response.json();
      
      // Set user data in context instead of localStorage
      setUser({
        name: userData.fullName,
        email: userData.email,
        uid: userCredential.user.uid
      });
      
      // Navigate to home page after successful login
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-24 pb-16 flex items-center">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <FaPaw className="text-primary-600 text-4xl" />
                </div>
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-gray-600 mt-2">
                  Sign in to continue to PawMates
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1 text-left"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className="input pl-10"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1 text-left"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className="input pl-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-600"
                    >
                      Remember me
                    </label>
                  </div>

                  <a
                    href="/forgotpassword"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary btn-lg w-full"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;