import React from "react";
// import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
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
export default function ProductGrid({ products }) {
  const regularProducts = products.filter(p => !p.is_featured) || [];

  const getCategoryColor = (category) => {
    const colors = {
      rings: "bg-pink-100 text-pink-700",
      necklaces: "bg-purple-100 text-purple-700", 
      earrings: "bg-blue-100 text-blue-700",
      bracelets: "bg-green-100 text-green-700",
      watches: "bg-indigo-100 text-indigo-700",
      pendants: "bg-amber-100 text-amber-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getMetalColor = (metal) => {
    const colors = {
      gold: "text-yellow-600",
      silver: "text-gray-500",
      platinum: "text-slate-600",
      rose_gold: "text-rose-500",
      white_gold: "text-gray-400"
    };
    return colors[metal] || "text-gray-600";
  };

  return (
    <div className="px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Collection</h2>
        <p className="text-gray-600">Discover handcrafted jewelry pieces</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {regularProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image_url || "/api/placeholder/200/200"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              
              {/* Wishlist button */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>

              {/* Stock indicator */}
              {product.stock_quantity <= 2 && product.stock_quantity > 0 && (
                <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                  Only {product.stock_quantity} left
                </Badge>
              )}
              
              {product.stock_quantity === 0 && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex gap-1 mb-2">
                <Badge variant="secondary" className={getCategoryColor(product.category)}>
                  {product.category}
                </Badge>
              </div>

              <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                <span className={`text-xs font-medium ${getMetalColor(product.metal_type)}`}>
                  {product.metal_type?.replace('_', ' ')}
                </span>
                {product.weight && (
                  <span className="text-xs text-gray-500">• {product.weight}g</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-amber-600">
                  ${product.price}
                </span>
                
                <Button 
                  size="sm" 
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {regularProducts.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No products available</p>
        </div>
      )}
    </div>
  );
}