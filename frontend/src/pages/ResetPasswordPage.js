import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPaw, FaLock } from "react-icons/fa";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { getAuth, confirmPasswordReset } from "firebase/auth";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const oobCode = query.get("oobCode"); // Get the oobCode from the URL

  const handlePasswordChange = (e, field) => {
    const value = e.target.value;
    if (field === "new") {
      setNewPassword(value);
    } else if (field === "reenter") {
      setReenterPassword(value);
    }
  };

  const validatePassword = () => {
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    
    if (newPassword !== reenterPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    if (!validatePassword()) {
      setIsLoading(false);
      return;
    }

    if (!oobCode) {
      setError("Invalid or expired reset link");
      setIsLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess("Password reset successfully!");

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
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
                <h1 className="text-2xl font-bold">Set New Password</h1>
                <p className="text-gray-600 mt-2">
                  Enter your new password below.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {success}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label htmlFor="password" className="label">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => handlePasswordChange(e, "new")}
                      className="input pl-10"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="label">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      value={reenterPassword}
                      onChange={(e) => handlePasswordChange(e, "reenter")}
                      type="password"
                      className="input pl-10"
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary btn-lg w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <img 
                        src="https://cdn.jsdelivr.net/npm/spinners-react@1.0.6/icons/spinner-gap.svg"
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        alt="Loading"
                      />
                      Resetting Password...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;