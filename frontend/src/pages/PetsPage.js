import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PetCard from "../components/pets/PetCard";
import PetFilters from "../components/pets/PetFilters";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { pets } from "../data/mockPets"; // Import mock pets data

const PetsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: queryParams.get("search") || "",
    species: queryParams.get("species") || "",
    age: queryParams.get("age") || "",
    size: queryParams.get("size") || "",
    gender: queryParams.get("gender") || "",
  });

  // Apply filters to mock pets data
  useEffect(() => {
    setIsLoading(true);
    const applyFilters = () => {
      let filtered = [...pets];

      // Apply search (location) filter
      if (filters.search) {
        filtered = filtered.filter((pet) =>
          pet.location.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Apply species filter
      if (filters.species) {
        filtered = filtered.filter((pet) => pet.species === filters.species);
      }

      // Apply age filter
      if (filters.age) {
        const [min, max] = filters.age.split("-").map(Number);
        if (max) {
          filtered = filtered.filter((pet) => pet.age >= min && pet.age <= max);
        } else if (filters.age.includes("+")) {
          filtered = filtered.filter((pet) => pet.age >= min);
        } else if (min === 0 && max === 1) {
          filtered = filtered.filter((pet) => pet.age < 1);
        }
      }

      // Apply size filter
      if (filters.size) {
        filtered = filtered.filter((pet) => pet.size === filters.size);
      }

      // Apply gender filter
      if (filters.gender) {
        filtered = filtered.filter((pet) => pet.gender === filters.gender);
      }

      setFilteredPets(filtered);
      setIsLoading(false);
    };

    applyFilters();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Pet</h1>
            <p className="text-gray-600">
              Browse our available pets and filter to find your perfect match.
            </p>
          </div>

          <PetFilters onFilterChange={handleFilterChange} />

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet, index) => (
                <PetCard key={pet.id} pet={pet} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">🐾</span>
              </div>
              <h2 className="text-2xl font-medium mb-2">No pets found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to find more pets.
              </p>
              <button
                onClick={() =>
                  handleFilterChange({
                    search: "",
                    species: "",
                    age: "",
                    size: "",
                    gender: "",
                  })
                }
                className="btn-outline btn-md"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PetsPage;