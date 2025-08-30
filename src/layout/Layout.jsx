// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// // import { createPageUrl } from "../utils";
// import { ShoppingCart, Star, TrendingUp } from "lucide-react";
// // import { InvokeLLM } from "../integrations/Core";

// const InvokeLLM = async () => {
//   // Fake gold price for demo
//   return "65.50";
// };

// const createPageUrl = (page) => `/${page.toLowerCase()}`;
// export default function Layout({ children }) { //{children, currentPageName}
//   const location = useLocation();
//   const [goldPrice, setGoldPrice] = useState(null);
//   const [cartCount] = useState(3); // Mock cart count

//   useEffect(() => {
//     fetchGoldPrice();
//     // Update gold price every 5 minutes
//     const interval = setInterval(fetchGoldPrice, 5 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchGoldPrice = async () => {
//     try {
//       const result = await InvokeLLM({
//         prompt: "What is the current gold price per gram in USD? Give me just the number, no currency symbol.",
//         add_context_from_internet: true
//       });
//       const price = parseFloat(result);
//       if (!isNaN(price)) {
//         setGoldPrice(price);
//       }
//     } catch (error) {
//       console.error("Error fetching gold price:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
//       {/* Premium Navigation */}
//       <nav className="bg-white/95 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 shadow-sm">
//         <div className="px-4 py-3">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
//                 <Star className="w-5 h-5 text-white" />
//               </div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
//                 LuxJewels
//               </h1>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex items-center space-x-6">
//               <Link 
//                 to={createPageUrl("Home")} 
//                 className={`text-sm font-medium transition-colors ${
//                   location.pathname === createPageUrl("Home") 
//                     ? 'text-amber-600' 
//                     : 'text-gray-600 hover:text-amber-600'
//                 }`}
//               >
//                 Catalogue
//               </Link>
              
//               {/* Cart */}
//               <button className="relative">
//                 <ShoppingCart className="w-5 h-5 text-gray-600" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Live Gold Price */}
//           <div className="mt-3 pt-3 border-t border-amber-100">
//             <div className="flex items-center justify-center space-x-2 text-sm">
//               <TrendingUp className="w-4 h-4 text-emerald-500" />
//               <span className="text-gray-600">Live Gold Price:</span>
//               <span className="font-bold text-amber-600">
//                 {goldPrice ? `$${goldPrice.toFixed(2)}/g` : 'Loading...'}
//               </span>
//               <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="pb-6">
//         {children}
//       </main>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Star, TrendingUp } from "lucide-react";

// ✅ Stub for demo – safe even if called with args
const InvokeLLM = async () => {
  return "65.50";
};


const createPageUrl = (page) => `/${page.toLowerCase()}`;

export default function Layout({ children }) {
  const location = useLocation();
  const [goldPrice, setGoldPrice] = useState(null);
  const [cartCount] = useState(3); // Mock cart count

  useEffect(() => {
    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchGoldPrice = async () => {
    try {
      const result = await InvokeLLM();
      const price = parseFloat(result);
      if (!isNaN(price)) {
        setGoldPrice(price);
      }
    } catch (error) {
      console.error("Error fetching gold price:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                LuxJewels
              </h1>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-6">
              <Link
                to={createPageUrl("Home")}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === createPageUrl("Home")
                    ? "text-amber-600"
                    : "text-gray-600 hover:text-amber-600"
                }`}
              >
                Catalogue
              </Link>

              {/* Cart */}
              <button className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Live Gold Price */}
          <div className="mt-3 pt-3 border-t border-amber-100">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-600">Live Gold Price:</span>
              <span className="font-bold text-amber-600">
                {goldPrice ? `$${goldPrice.toFixed(2)}/g` : "Loading..."}
              </span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pb-6">{children}</main>
    </div>
  );
}
