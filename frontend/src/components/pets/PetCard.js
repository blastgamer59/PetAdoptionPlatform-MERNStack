import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDog, FaCat, FaMapMarkerAlt, FaMars, FaVenus, FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../context/FavoritesContext";
import { useUserAuth } from "../../context/AuthContext";

const PetCard = ({ pet, index }) => {
  const { id, name, species, breed, age, gender, location, images, status } = pet;
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useUserAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const SpeciesIcon = species === "Dog" ? FaDog : FaCat;
  const GenderIcon = gender === "Male" ? FaMars : FaVenus;

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      setErrorMessage("Please log in to save favorites");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (isFavorite(pet.id)) {
      const result = await removeFavorite(pet.id);
      if (!result.success) {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } else {
      const result = await addFavorite(pet);
      if (!result.success) {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/pets/${id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={images && images.length > 0 ? images[0] : "https://via.placeholder.com/300"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {status === "available" ? "Available" : "Pending"}
          </div>

          {/* Favorite Icon */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full flex items-center justify-center ${
              isFavorite(id) ? "bg-accent-100 text-accent-500" : "bg-gray-100 text-gray-500"
            } hover:bg-accent-200 transition-colors`}
          >
            {isFavorite(id) ? (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                <FaHeart className="text-lg" />
              </motion.div>
            ) : (
              <FaRegHeart className="text-lg" />
            )}
          </button>

          {/* Error Message */}
          {errorMessage && (
            <div className="absolute top-12 right-3 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">{name}</h3>
            <div className="flex items-center text-gray-600">
              <SpeciesIcon className="mr-1" />
              <span className="text-sm">{species}</span>
            </div>
          </div>

          <div className="text-gray-600 text-sm mb-3">{breed}</div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <GenderIcon className={`mr-1 ${gender === "Male" ? "text-blue-500" : "text-pink-500"}`} />
              <span>{gender}</span>
            </div>
            <span>{age} {age === 1 ? "year" : "years"}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-1" />
            <span>{location}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PetCard;