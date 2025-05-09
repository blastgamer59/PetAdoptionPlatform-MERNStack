import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from "react-icons/fa";

const PetGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative rounded-xl overflow-hidden mb-2">
        <div className="aspect-w-4 aspect-h-3 bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`Pet image ${activeIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          onClick={prevImage}
        >
          <FaChevronLeft className="text-gray-800" />
        </button>
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          onClick={nextImage}
        >
          <FaChevronRight className="text-gray-800" />
        </button>

        {/* Fullscreen Button */}
        <button
          className="absolute right-3 top-3 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          onClick={toggleFullscreen}
        >
          <FaExpand className="text-gray-800" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative rounded-md overflow-hidden focus:outline-none ${
                activeIndex === index
                  ? "ring-2 ring-primary-500"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="h-16 w-16">
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={toggleFullscreen}
          >
            <div className="relative w-full max-w-4xl max-h-screen p-4">
              <img
                src={images[activeIndex]}
                alt={`Pet image ${activeIndex + 1}`}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={toggleFullscreen}
              >
                <FaTimes className="text-xl" />
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <FaChevronLeft className="text-xl" />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <FaChevronRight className="text-xl" />
              </button>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-md">
                {activeIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetGallery;