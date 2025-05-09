import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPaw,
  FaSearch,
  FaDog,
  FaCat,
  FaHeart,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { pets } from "../data/mockPets";
import PetCard from "../components/pets/PetCard";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const scrollRef = useRef(null);

  useEffect(() => {
    const featured = pets.filter((pet) => pet.featured).slice(0, 4);
    setFeaturedPets(featured);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ensure correct state on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    setCurrentStoryIndex((prev) => Math.max(prev - (isMobile ? 1 : 4), 0));
  };

  const scrollRight = () => {
    const moveBy = isMobile ? 1 : 4;
    setCurrentStoryIndex((prev) =>
      Math.min(prev + moveBy, successStories.length - (isMobile ? 1 : 4))
    );
  };

  const successStories = [
    {
      title: "Max Found His Family",
      description:
        "Max's love for walks and playtime brings endless joy to our kids daily.",
      author: "The Johnson Family",
      image:
        "https://images.pexels.com/photos/1591939/pexels-photo-1591939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Luna's Second Chance",
      description:
        "Luna, my perfect companion, curls up beside me, filling my home with love.",
      author: "Sarah M.",
      image:
        "https://images.pexels.com/photos/374898/pexels-photo-374898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Rocky's New Adventure",
      description:
        "Rocky's energy and ball-chasing make him our kids' ultimate playmate daily.",
      author: "The Carter Family",
      image:
        "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Mia's Forever Home",
      description:
        "Shy Mia now cuddles and sunbathes, bringing warmth to our lives daily.",
      author: "Emily R.",
      image:
        "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Buddy's Big Break",
      description:
        "Buddy chases chickens and naps by our farm's fire, living his dream.",
      author: "The Thompson Family",
      image:
        "https://images.pexels.com/photos/5731878/pexels-photo-5731878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Whiskers' Happy Ending",
      description:
        "Whiskers' purring and playful antics keep us smiling every single day.",
      author: "Michael T.",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/008/951/892/small/cute-puppy-pomeranian-mixed-breed-pekingese-dog-run-on-the-grass-with-happiness-photo.jpg",
    },
    {
      title: "Duke's Loving Family",
      description:
        "Duke's loyalty and goofy personality make him our kids' best friend.",
      author: "The Lee Family",
      image:
        "https://images.pexels.com/photos/225406/pexels-photo-225406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Bella's New Beginning",
      description:
        "Bella's gentle purrs and sun-napping bring warmth to our home daily.",
      author: "Laura K.",
      image:
        "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const visibleStories = isMobile
    ? [successStories[currentStoryIndex]]
    : successStories.slice(currentStoryIndex, currentStoryIndex + 4);

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white pt-20">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-[url('https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg')] animate-hero-bg"
          style={{
            animation: "hero-bg 4s infinite",
          }}
        ></div>

        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-2xl">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect Companion
            </motion.h1>

            <motion.p
              className="text-xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Thousands of adoptable pets are looking for their forever homes.
              Start your search today. Every pet deserves a loving home. Our
              mission is to connect wonderful animals with caring families.
              Whether you're looking for a playful puppy, a gentle senior dog, a
              curious kitten, or a calm adult cat, we have the perfect companion
              waiting for you.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/pets?species=Dog"
                className="btn-md flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-full shadow-sm"
              >
                <FaDog /> Dogs
              </Link>
              <Link
                to="/pets?species=Cat"
                className="btn-md flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-full shadow-sm"
              >
                <FaCat /> Cats
              </Link>
              <Link
                to="/pets"
                className="btn-md flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-full shadow-sm"
              >
                <FaPaw /> All Pets
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Featured Pets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These adorable companions are looking for their forever homes.
              Each has their own unique personality and story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPets.map((pet, index) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pets"
              className="btn-primary btn-lg shadow-sm hover:shadow-md"
            >
              See All Available Pets
            </Link>
          </div>
        </div>
      </section>

      {/* How Adoption Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Adoption Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our adoption process is designed to ensure the best match between
              pets and their new families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-primary-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Find Your Match</h3>
              <p className="text-gray-600">
                Browse our available pets and use filters to find the perfect
                companion that matches your lifestyle.
              </p>
            </motion.div>

            <motion.div
              className="bg-primary-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                2. Submit Application
              </h3>
              <p className="text-gray-600">
                Complete an adoption application. Our team reviews applications
                to ensure good matches for our animals.
              </p>
            </motion.div>

            <motion.div
              className="bg-primary-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPaw className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Welcome Home</h3>
              <p className="text-gray-600">
                Once approved, schedule a time to meet your new pet and complete
                the adoption process to bring them home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Heartwarming tales of pets finding their forever homes, bringing
              joy to families.
            </p>
          </div>

          <div className="relative">
            {currentStoryIndex > 0 && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-110"
                aria-label="Previous stories"
              >
                <FaArrowLeft className="text-lg" />
              </button>
            )}

            {currentStoryIndex < successStories.length - (isMobile ? 1 : 4) && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-110"
                aria-label="Next stories"
              >
                <FaArrowRight className="text-lg" />
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleStories.map((story, index) => (
                <motion.div
                  key={story.title}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">
                      {story.description}
                    </p>
                    <p className="text-primary-600 font-medium text-sm mt-auto">
                      {story.author}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
