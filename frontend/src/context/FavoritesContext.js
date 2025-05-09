import { createContext, useContext, useState, useEffect } from "react";
import { useUserAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated, user } = useUserAuth();

  // Load favorites from backend on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch(
            `http://localhost:5000/favorites?email=${encodeURIComponent(user.email)}`
          );
          if (response.ok) {
            const data = await response.json();
            setFavorites(data.map((item) => item.pet));
          } else {
            console.error("Failed to fetch favorites:", response.status);
            setFavorites([]);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user]);

  // Add a pet to favorites
  const addFavorite = async (pet) => {
    if (!isAuthenticated || !user) {
      return { success: false, message: "Please log in to add to favorites" };
    }

    if (!favorites.some((fav) => fav.id === pet.id)) {
      try {
        const response = await fetch("http://localhost:5000/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: user.email, pet }),
        });
        if (response.ok) {
          setFavorites([...favorites, pet]);
          return { success: true };
        } else {
          const errorData = await response.json();
          return { success: false, message: errorData.error || "Failed to add favorite" };
        }
      } catch (error) {
        console.error("Error adding favorite:", error);
        return { success: false, message: "Internal Server Error" };
      }
    }
    return { success: false, message: "Pet already in favorites" };
  };

  // Remove a pet from favorites
  const removeFavorite = async (petId) => {
    if (!isAuthenticated || !user) {
      return { success: false, message: "Please log in to manage favorites" };
    }

    try {
      const url = `http://localhost:5000/favorites/${encodeURIComponent(petId)}?userEmail=${encodeURIComponent(user.email)}`;
      console.log("Removing favorite with URL:", url);

      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        setFavorites(favorites.filter((pet) => pet.id !== petId));
        return { success: true };
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("Error response data:", errorData);
        return { success: false, message: errorData.error || "Failed to remove favorite" };
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      return { success: false, message: "Internal Server Error" };
    }
  };

  // Check if a pet is in favorites
  const isFavorite = (petId) => {
    return favorites.some((pet) => pet.id === petId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};