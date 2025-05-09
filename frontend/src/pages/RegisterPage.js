import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useUserAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, setUser } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form data
    if (!formData.fullName.trim()) {
      return setError("Name is required");
    }
    if (!formData.email.trim()) {
      return setError("Email is required");
    }
    if (!formData.password) {
      return setError("Password is required");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!formData.agreeTerms) {
      return setError("You must agree to the Terms of Service and Privacy Policy");
    }

    try {
      setLoading(true);
      
      // Step 1: Create user in Firebase Authentication
      const userCredential = await signUp(formData.email, formData.password);
      
      // Step 2: Save additional user data in MongoDB
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      
      // Set user data in context instead of localStorage
      setUser({
        name: formData.fullName,
        email: formData.email,
        uid: userCredential.user.uid
      });
      
      // Navigate directly to home page after successful registration
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
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
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-gray-600 mt-2">
                  Join PawMates to find your perfect pet
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      className="input pl-10"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className="input pl-10"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className="input pl-10"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type="password"
                      className="input pl-10"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="agreeTerms"
                      className="font-medium text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="/register"
                        className="text-primary-600 hover:text-primary-500"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/register"
                        className="text-primary-600 hover:text-primary-500"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary btn-lg w-full" 
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Sign in
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

export default RegisterPage;