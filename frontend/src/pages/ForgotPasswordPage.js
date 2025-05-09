import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaPaw, FaEnvelope } from "react-icons/fa";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    const email = data.email;
    localStorage.setItem("userEmail", email);

    try {
      // First check if email is registered via backend API
      const checkEmailResponse = await axios.post("http://localhost:5000/check-email", {
        email,
      });

      console.log("Email check response:", checkEmailResponse.data);

      if (!checkEmailResponse.data.registered) {
        setError("Email address is not registered. Please sign up first.");
        setIsLoading(false);
        return;
      }

      // If email is registered, send password reset email via Firebase
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/login",
        handleCodeInApp: true // This makes the link open in your app
      });
      
      console.log("Password reset email sent successfully");
      setSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);
      
      // Handle API errors
      if (error.response) {
        setError(`Server error: ${error.response.data.error || "Please try again later."}`);
      }
      // Handle Firebase auth errors
      else if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            setError("No account found with this email address.");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;
          case "auth/too-many-requests":
            setError("Too many attempts. Please try again later.");
            break;
          default:
            setError(`Failed to send reset email: ${error.message}`);
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
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
                <h1 className="text-2xl font-bold">Reset Your Password</h1>
                <p className="text-gray-600 mt-2">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center">
                  <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
                    <p>Password reset email sent!</p>
                    <p className="text-sm mt-2">
                      Please check your inbox and follow the instructions to reset your password.
                      If you don't see the email, check your spam folder.
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Return to Login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="label">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        className={`input pl-10 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="your@email.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary btn-lg w-full"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </button>

                  <div className="text-center">
                    <Link
                      to="/login"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Remember your password?{" "}
                      <span className="font-medium text-primary-600 hover:text-primary-500">
                        Login
                      </span>
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;