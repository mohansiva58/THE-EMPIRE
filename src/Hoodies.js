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

const Hoodies = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback data (Predefined hoodies)
  const fallbackProducts = [
    { id: 1, img: './Hoodies/h1.jpg', price: 1299 },
    { id: 2, img: './Hoodies/h2.jpg', price: 999 },
    { id: 3, img: './Hoodies/h3.jpg', price: 1799 },
    { id: 4, img: './Hoodies/h4.jpg', price: 1299 },
    { id: 5, img: './Hoodies/h5.jpg', price: 1499 },
    { id: 6, img: './Hoodies/h6.jpg', price: 1599 },
    { id: 7, img: './Hoodies/h7.jpg', price: 999 },
    { id: 8, img: './Hoodies/h8.jpg', price: 1199 },
    { id: 9, img: './Hoodies/h9.jpg', price: 1299 },
    { id: 10, img: './Hoodies/h10.jpg', price: 2499 },
    { id: 11, img: './Hoodies/h11.jpg', price: 4999 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Hoodies")
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
    return <div>Loading Hoodies...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <h2>Hoodies Collection</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product" key={product.id || index}>
            <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`Hoodie ${product.id || index}`} />
            <p>MRP: ₹{product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hoodies;