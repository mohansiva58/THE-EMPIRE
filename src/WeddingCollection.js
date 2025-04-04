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

const WeddingCollection = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback Data (Predefined Wedding Collection)
  const fallbackProducts = [
    { id: 1, img: './Wedding/b1.png', price: 1199 },
    { id: 2, img: './Wedding/b2.png', price: 1999 },
    { id: 3, img: './Wedding/b3.png', price: 2299 },
    { id: 4, img: './Wedding/b4.png', price: 1299 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Wedding")
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
    return <div>Loading Wedding Collection...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="image-wrapper">
              <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`Product ${product.id}`} />
            </div>
            <p>MRP: {product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingCollection;