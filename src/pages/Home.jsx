// import React, { useState, useEffect } from "react";
// import productsData from "../products/Products.json";
// import ProductCarousel from "../components/ProductCarousel.jsx";
// import ProductGrid from "../components/ProductGrid.jsx";
// <h1 style={{ color: "red" }}>Hello from Home Page</h1>

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       setIsLoading(true);
//       const data = await productsData.list("-created_date");
//       setProducts(data);
//     } catch (error) {
//       console.error("Error loading products:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
//       {/* Hero Carousel */}
//       <ProductCarousel products={products} />
      
//       {/* Product Grid */}
//       <ProductGrid products={products} />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import productsData from "../products/Products.json";
import ProductCarousel from "../components/ProductCarousel.jsx";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);

      // ✅ since productsData is just an array, use it directly
      setProducts(productsData);

    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">

      {/* Hero Carousel */}
      <ProductCarousel products={products} />

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
