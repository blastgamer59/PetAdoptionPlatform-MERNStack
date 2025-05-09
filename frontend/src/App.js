import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext"; 
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import PetsPage from "./pages/PetsPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import AboutPage from './pages/AboutPage'
import FavoritesPage from './pages/FavoritesPage'
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ApplicationsPage from "./pages/ApplicationsPage";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
      <UserAuthContextProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/pets/:id" element={<PetDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="/resetpassword" element={<ResetPasswordPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
            </Routes>
          </FavoritesProvider>
          </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;