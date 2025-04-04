import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

// Lazy loading for images
const LazyImage = ({ src, alt }) => (
  <Suspense fallback={<div className="image-placeholder">Loading...</div>}>
    <img src={src} alt={alt} />
  </Suspense>
);

// Function to dynamically import images
const importImage = (imagePath) => lazy(() => import(`${imagePath}`));

const Jeans = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback Data (Predefined Jeans)
  const fallbackProducts = [
    { id: 1, img: './Jeans/j1.jpg', price: 1299 },
    { id: 2, img: './Jeans/j2.jpg', price: 1599 },
    { id: 3, img: './Jeans/j3.jpg', price: 1799 },
    { id: 4, img: './Jeans/j4.jpg', price: 1499 },
    { id: 5, img: './Jeans/j5.jpg', price: 1999 },
    { id: 6, img: './Jeans/j6.jpg', price: 1899 },
    { id: 7, img: './Jeans/j7.jpg', price: 1699 },
    { id: 8, img: './Jeans/j8.jpg', price: 2099 },
    { id: 9, img: './Jeans/j9.jpg', price: 1799 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Jeans")
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
    return <div>Loading Jeans...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <h2>Jeans Collection</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product" key={product.id || index}>
             <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`Jeans ${product.id || index}`} />
            <p>MRP: ₹{product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jeans;