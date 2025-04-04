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

const PremiumCollection = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback Data (Predefined 29 Products)
  const fallbackProducts = [
    { id: 1, img: './pics/1.jpg', price: 1199 },
    { id: 2, img: './pics/2.jpg', price: 1999 },
    { id: 3, img: './pics/3.jpg', price: 2299 },
    { id: 4, img: './pics/4.jpg', price: 1299 },
    { id: 5, img: './pics/5.jpg', price: 1899 },
    { id: 6, img: './pics/6.jpg', price: 2799 },
    { id: 7, img: './pics/7.jpg', price: 1499 },
    { id: 8, img: './pics/8.jpg', price: 2199 },
    { id: 9, img: './pics/9.jpg', price: 1599 },
    { id: 10, img: './pics/10.jpg', price: 1699 },
    { id: 11, img: './pics/11.jpg', price: 1799 },
    { id: 12, img: './pics/12.jpg', price: 1899 },
    { id: 13, img: './pics/13.jpg', price: 1999 },
    { id: 14, img: './pics/14.jpg', price: 2099 },
    { id: 15, img: './pics/15.jpg', price: 2199 },
    { id: 16, img: './pics/16.jpg', price: 2299 },
    { id: 17, img: './pics/17.jpg', price: 2399 },
    { id: 18, img: './pics/18.jpg', price: 2499 },
    { id: 19, img: './pics/19.jpg', price: 2599 },
    { id: 20, img: './pics/20.jpg', price: 2699 },
    { id: 21, img: './pics/21.jpg', price: 2799 },
    { id: 22, img: './pics/22.jpg', price: 2899 },
    { id: 23, img: './pics/23.jpg', price: 2999 },
    { id: 24, img: './pics/24.jpg', price: 3099 },
    { id: 25, img: './pics/25.jpg', price: 3199 },
    { id: 26, img: './pics/26.jpg', price: 3299 },
    { id: 27, img: './pics/27.jpg', price: 999 },
    { id: 28, img: './pics/28.jpg', price: 1299 },
    { id: 29, img: './pics/29.jpg', price: 999 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Premium")
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
    return <div>Loading Premium Collection...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <h2>Premium Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="image-wrapper">
              <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`Product ${product.id}`} />
            </div>
            <p>MRP: ₹{product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumCollection;