import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

// Lazy loading for images
const LazyImage = ({ src, alt }) => (
  <Suspense fallback={<div className="image-placeholder">Loading...</div>}>
    <img src={src} alt={alt} />
  </Suspense>
);

// Function to dynamically import images
const importImage = (imagePath) => lazy(() => import(`${imagePath}`));

const Formals = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback Data (If API fails)
  const fallbackProducts = [
    { id: 1, img: './Formals/f1.jpg', price: 999 },
    { id: 2, img: './Formals/f2.jpg', price: 1099 },
    { id: 3, img: './Formals/f3.jpg', price: 1199 },
    { id: 4, img: './Formals/f4.jpg', price: 899 },
    { id: 5, img: './Formals/f5.jpg', price: 1299 },
    { id: 6, img: './Formals/f6.jpg', price: 999 },
    { id: 7, img: './Formals/f7.jpg', price: 1399 },
    { id: 8, img: './Formals/f8.jpg', price: 1199 },
    { id: 9, img: './Formals/f9.jpg', price: 999 },
    { id: 10, img: './Formals/f10.jpg', price: 1499 },
    { id: 11, img: './Formals/f11.jpg', price: 1599 },
    { id: 12, img: './Formals/f12.jpg', price: 899 },
    { id: 13, img: './Formals/f13.jpg', price: 1299 },
    { id: 14, img: './Formals/f14.jpg', price: 1799 },
    { id: 15, img: './Formals/f15.jpg', price: 1099 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Formals")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const newProducts = response.data.map((product, index) => ({
            id: product.id || `new-${index}`,
            img: product.image || "https://via.placeholder.com/150", // Default if API image is missing
            price: product.price || "N/A",
          }));
          setProducts([...fallbackProducts, ...newProducts]);
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts(fallbackProducts);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call (success or failure)
      });
  }, []);

  if (loading) {
    return <div>Loading Formal Wear...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <h2>Formal Wear Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`Formal Wear ${product.id}`} />
            <p>MRP: ₹{product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formals;