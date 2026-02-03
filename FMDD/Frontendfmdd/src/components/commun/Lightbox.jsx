import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ images, selectedImageIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrev(e);
    if (e.key === "ArrowRight") handleNext(e);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-labelledby="lightbox-title"
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-yellow focus:outline-none"
        onClick={onClose}
        aria-label="Fermer"
      >
        <X size={32} />
      </button>

      <button
        className="absolute left-4 md:left-8 text-white hover:text-yellow p-2 rounded-full focus:outline-none"
        onClick={handlePrev}
        aria-label="Image précédente"
      >
        <ChevronLeft size={32} />
      </button>

      <div className="max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]?.src}
          alt={images[currentIndex]?.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-md shadow-lg"
        />
        <div className="text-white text-center mt-4">
          <p id="lightbox-title" className="font-poppins">{images[currentIndex]?.alt}</p>
          <p className="text-sm text-gray-300">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>

      <button
        className="absolute right-4 md:right-8 text-white hover:text-yellow p-2 rounded-full focus:outline-none"
        onClick={handleNext}
        aria-label="Image suivante"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default Lightbox;
