import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const Button = ({ children, className, ...props }) => (
  <button className={`px-3 py-1 rounded ${className}`} {...props}>
    {children}
  </button>
);

const Badge = ({ children, className }) => (
  <span className={`px-2 py-1 rounded text-xs font-medium ${className}`}>
    {children}
  </span>
);   


export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProducts = products.filter(p => p.is_featured) || [];

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  if (featuredProducts.length === 0) {
    return (
      <div className="relative h-80 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-4 mb-6">
        <p className="text-amber-600">No featured products available</p>
      </div>
    );
  }

  return (
    <div className="relative h-80 mx-4 mb-8 overflow-hidden rounded-2xl shadow-lg">
      {/* Fade overlay on sides */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent z-10"></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <img
            src={featuredProducts[currentIndex]?.image_url || "/api/placeholder/400/320"}
            alt={featuredProducts[currentIndex]?.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Product info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-2">
                {featuredProducts[currentIndex]?.name}
              </h3>
              <p className="text-sm opacity-90 mb-3 line-clamp-2">
                {featuredProducts[currentIndex]?.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-amber-300">
                  ${featuredProducts[currentIndex]?.price}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Heart className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-20"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}