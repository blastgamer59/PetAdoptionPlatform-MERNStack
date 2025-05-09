import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaPaw,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaMars,
  FaVenus,
} from "react-icons/fa";
import AdoptionForm from "../components/forms/AdoptionForm";
import { useFavorites } from "../context/FavoritesContext";
import { useUserAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { pets, shelters } from "../data/mockPets";

const PetDetailsPage = () => {
  const { id } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { user, isAuthenticated } = useUserAuth();
  const [pet, setPet] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const fetchPetAndShelter = () => {
      try {
        const foundPet = pets.find((p) => p.id === parseInt(id));
        if (!foundPet) {
          setPet(null);
          setShelter(null);
          setIsLoading(false);
          return;
        }
        setPet(foundPet);

        const foundShelter = shelters.find((s) => s.id === foundPet.shelterId);
        setShelter(foundShelter || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    fetchPetAndShelter();
  }, [id]);

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

  const handleAdoptionSubmit = async (data) => {
    if (!isAuthenticated) {
      setErrorMessage("Please log in to submit an adoption application");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: pet.id,
          adopterId: user.uid,
          applicantInfo: { ...data, petName: pet.name },
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.error || "Failed to submit adoption application"
        );
      }

      setSuccessMessage(
        "Your application has been submitted successfully. We will review it  and get back to you via email. Please check your inbox or spam folder."
      );
      window.scrollTo(0, 0); // Scroll to top to show success message
      setTimeout(() => setSuccessMessage(null), 10000); // Show success message for 10 seconds
    } catch (error) {
      console.error("Error submitting adoption application:", error);
      setErrorMessage(error.message || "Failed to submit adoption application");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Pet Not Found</h2>
        <p className="mb-6">
          The pet you're looking for doesn't seem to exist.
        </p>
        <Link to="/pets" className="btn-primary btn-lg">
          Browse Available Pets
        </Link>
      </div>
    );
  }

  const genderIcon =
    pet.gender === "Male" ? (
      <FaMars className="text-blue-500" />
    ) : (
      <FaVenus className="text-pink-500" />
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="container-custom">
          {/* Success Message Display */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
              <FaCheck className="mr-2" />
              {successMessage}
            </div>
          )}
          {/* Error Message Display */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
              <FaTimes className="mr-2" />
              {errorMessage}
            </div>
          )}

          {/* Navigation Links */}
          <div className="mb-6">
            <Link
              to="/pets"
              className="text-primary-600 hover:text-primary-700"
            >
              ← Back to All Pets
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Main Pet Image */}
                <div className="md:w-1/2">
                  {pet.images && pet.images.length > 0 ? (
                    <div className="w-full h-80 overflow-hidden rounded-lg">
                      <img
                        src={pet.images[0]}
                        alt={`${pet.name} the ${pet.breed}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>

                {/* Right Column - Pet Info */}
                <div className="md:w-1/2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold">{pet.name}</h1>
                      <p className="text-gray-600">
                        {pet.breed} • {pet.age}{" "}
                        {pet.age === 1 ? "year" : "years"} old
                      </p>
                    </div>
                    <button
                      onClick={handleFavoriteClick}
                      className={`p-2 rounded-full flex items-center justify-center ${
                        isFavorite(pet.id)
                          ? "bg-accent-100 text-accent-500"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isFavorite(pet.id) ? (
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaHeart className="text-xl" />
                        </motion.div>
                      ) : (
                        <FaRegHeart className="text-xl" />
                      )}
                    </button>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{pet.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        Available since{" "}
                        {new Date(pet.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center">
                      {genderIcon}
                      <span className="ml-1">{pet.gender}</span>
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {pet.size}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {pet.color}
                    </span>
                    {pet.vaccinated && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                        <FaCheck className="mr-1" />
                        Vaccinated
                      </span>
                    )}
                    {pet.neutered && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                        <FaCheck className="mr-1" />
                        Neutered/Spayed
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Good with:</h2>
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className={`p-3 rounded-lg text-center ${
                          pet.goodWith.includes("children")
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {pet.goodWith.includes("children") ? (
                          <FaCheck className="mx-auto mb-1" />
                        ) : (
                          <FaTimes className="mx-auto mb-1" />
                        )}
                        <span className="text-sm">Children</span>
                      </div>
                      <div
                        className={`p-3 rounded-lg text-center ${
                          pet.goodWith.includes("dogs")
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {pet.goodWith.includes("dogs") ? (
                          <FaCheck className="mx-auto mb-1" />
                        ) : (
                          <FaTimes className="mx-auto mb-1" />
                        )}
                        <span className="text-sm">Dogs</span>
                      </div>
                      <div
                        className={`p-3 rounded-lg text-center ${
                          pet.goodWith.includes("cats")
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {pet.goodWith.includes("cats") ? (
                          <FaCheck className="mx-auto mb-1" />
                        ) : (
                          <FaTimes className="mx-auto mb-1" />
                        )}
                        <span className="text-sm">Cats</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                      Adoption fee: ₹
                      {(pet.adoptionFee * 83).toLocaleString("en-IN")}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      This fee helps cover the cost of care including
                      vaccinations, microchipping, and spay/neuter.
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      className="btn-primary btn-lg w-full mb-3 flex items-center justify-center"
                      onClick={() => setActiveTab("adopt")}
                    >
                      <FaPaw className="mr-2" />
                      Adopt {pet.name}
                    </button>

                    <button
                      className="btn-outline btn-lg w-full"
                      onClick={handleFavoriteClick}
                    >
                      {isFavorite(pet.id) ? (
                        <>
                          <FaHeart className="mr-2 text-accent-500" />
                          Saved to Favorites
                        </>
                      ) : (
                        <>
                          <FaRegHeart className="mr-2" />
                          Save to Favorites
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex">
                <button
                  className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
                    activeTab === "details"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details & Description
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
                    activeTab === "shelter"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("shelter")}
                >
                  Shelter Information
                </button>
                {isAuthenticated && (
                  <button
                    className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
                      activeTab === "adopt"
                        ? "text-primary-600 border-b-2 border-primary-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("adopt")}
                  >
                    Adoption Application
                  </button>
                )}
              </div>

              <div className="p-6">
                {activeTab === "details" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      About {pet.name}
                    </h2>
                    <p className="text-gray-700 mb-6">{pet.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">
                          Characteristics
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">Species:</span>
                            <span>{pet.species}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">Breed:</span>
                            <span>{pet.breed}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">Age:</span>
                            <span>
                              {pet.age} {pet.age === 1 ? "year" : "years"}
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">Gender:</span>
                            <span>{pet.gender}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">Size:</span>
                            <span>{pet.size}</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">Color:</span>
                            <span>{pet.color}</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">
                          Health & Care
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">
                              Vaccinated:
                            </span>
                            <span>
                              {pet.vaccinated ? (
                                <span className="flex items-center text-green-600">
                                  <FaCheck className="mr-1" /> Yes
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600">
                                  <FaTimes className="mr-1" /> No
                                </span>
                              )}
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">
                              Neutered/Spayed:
                            </span>
                            <span>
                              {pet.neutered ? (
                                <span className="flex items-center text-green-600">
                                  <FaCheck className="mr-1" /> Yes
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600">
                                  <FaTimes className="mr-1" /> No
                                </span>
                              )}
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">
                              Good with kids:
                            </span>
                            <span>
                              {pet.goodWith.includes("children") ? (
                                <span className="flex items-center text-green-600">
                                  <FaCheck className="mr-1" /> Yes
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600">
                                  <FaTimes className="mr-1" /> No
                                </span>
                              )}
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">
                              Good with dogs:
                            </span>
                            <span>
                              {pet.goodWith.includes("dogs") ? (
                                <span className="flex items-center text-green-600">
                                  <FaCheck className="mr-1" /> Yes
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600">
                                  <FaTimes className="mr-1" /> No
                                </span>
                              )}
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-1/3 font-medium">
                              Good with cats:
                            </span>
                            <span>
                              {pet.goodWith.includes("cats") ? (
                                <span className="flex items-center text-green-600">
                                  <FaCheck className="mr-1" /> Yes
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600">
                                  <FaTimes className="mr-1" /> No
                                </span>
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "shelter" && shelter && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      About {shelter.name}
                    </h2>
                    <p className="text-gray-700 mb-6">{shelter.description}</p>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">
                        Contact Information
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <span className="w-1/3 font-medium">Location:</span>
                          <span>{shelter.location}</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1/3 font-medium">Phone:</span>
                          <span>{shelter.phone}</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1/3 font-medium">Email:</span>
                          <span>{shelter.email}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "adopt" && (
                  <div>
                    {isAuthenticated ? (
                      <>
                        <h2 className="text-xl font-semibold mb-4">
                          Adopt {pet.name}
                        </h2>
                        <p className="text-gray-700 mb-6">
                          Complete the adoption application below to express
                          your interest in adopting {pet.name}. Our team will
                          review your application and contact you within 48
                          hours.
                        </p>
                        <AdoptionForm
                          pet={pet}
                          onSubmit={handleAdoptionSubmit}
                        />
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <h2 className="text-xl font-semibold mb-4">
                          Please Log In to Adopt
                        </h2>
                        <p className="text-gray-700 mb-6">
                          You must be logged in to submit an adoption
                          application for {pet.name}.
                        </p>
                        <div className="flex justify-center gap-4">
                          <Link
                            to="/login"
                            className="btn-primary btn-lg flex items-center justify-center"
                          >
                            Log In
                          </Link>
                          <Link
                            to="/signup"
                            className="btn-outline btn-lg flex items-center justify-center"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PetDetailsPage;
