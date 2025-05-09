import { useState, useEffect } from "react";
import { FaPaw } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { useUserAuth } from "../context/AuthContext";
import PetCard from "../components/pets/PetCard";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { isAuthenticated } = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      if (favorites.length === 0 && !isLoading) {
        setErrorMessage(
          "No favorites found. Start adding pets to your favorites!"
        );
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }, 500);
  }, [favorites, isLoading]);

  const handleRemoveFavorite = async (petId) => {
    if (!isAuthenticated) {
      setErrorMessage("Please log in to manage favorites");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      const result = await removeFavorite(petId);
      if (result.success) {
        setSuccessMessage("Pet removed from favorites successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setErrorMessage(result.message || "Failed to remove from favorites");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      setErrorMessage("An error occurred while removing the pet from favorites");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container-custom">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Favorite Pets</h1>
            <p className="text-gray-600">
              Keep track of the pets you're interested in adopting
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
              <FaPaw className="mr-2" />
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
              <FaPaw className="mr-2" />
              {errorMessage}
            </div>
          )}

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((pet, index) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  index={index}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPaw className="text-2xl text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Favorites Yet</h2>
              <p className="text-gray-600 mb-6">
                Start adding pets to your favorites to keep track of them.
              </p>
              <a href="/pets" className="btn-primary btn-lg">
                Browse Available Pets
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavoritesPage;