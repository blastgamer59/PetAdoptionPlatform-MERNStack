import { useState } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PetFilters = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    species: "",
    age: "",
    size: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      species: "",
      age: "",
      size: "",
      gender: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search for a pet..."
            className="input pl-10 w-full"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-2 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={toggleExpanded}
          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <FaFilter className="mr-2" />
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </button>

        {Object.values(filters).some((value) => value !== "") && (
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <span className="flex items-center">
              <FaTimes className="mr-1" /> Reset
            </span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Species Filter */}
              <div>
                <label htmlFor="species" className="label">
                  Species
                </label>
                <select
                  id="species"
                  name="species"
                  value={filters.species}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">All Species</option>
                  <option value="Dog">Dogs</option>
                  <option value="Cat">Cats</option>
                </select>
              </div>

              {/* Age Filter */}
              <div>
                <label htmlFor="age" className="label">
                  Age
                </label>
                <select
                  id="age"
                  name="age"
                  value={filters.age}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Any Age</option>
                  <option value="0-1">Under 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="4-7">4-7 years</option>
                  <option value="8+">8+ years</option>
                </select>
              </div>

              {/* Size Filter */}
              <div>
                <label htmlFor="size" className="label">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={filters.size}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Any Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label htmlFor="gender" className="label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={filters.gender}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Any Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetFilters;