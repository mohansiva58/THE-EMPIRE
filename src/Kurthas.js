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

const Kurthas = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback Data (Predefined Kurthas)
  const fallbackProducts = [
    { id: 1, img: './kurthas/1.jpg', price: 1299 },
    { id: 2, img: './kurthas/2.jpg', price: 1599 },
    // ... (rest of the fallback data)
    { id: 18, img: './kurthas/18.jpg', price: 1599 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Kurthas")
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
    return <div>Loading Kurthas...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <h2>Kurthas Collection</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product" key={product.id || index}>
            <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`Kurtha ${product.id || index}`} />
            <p>MRP: ₹{product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kurthas;