import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

// Lazy loading for images
const LazyImage = ({ src, alt }) => (
  <Suspense fallback={<div className="image-placeholder">Loading...</div>}>
    <img src={src} alt={alt} />
  </Suspense>
);

const Jackets = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Jackets")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
            setProducts([]); //set empty array if response is not an array.
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); //set empty array on error.
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call (success or failure)
      });
  }, []);

  if (loading) {
    return <div>Loading Jackets...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <LazyImage src={product.image || "https://via.placeholder.com/150"} alt="Product" />
            <p>MRP: {product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jackets;