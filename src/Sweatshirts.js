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

const Sweatshirts = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback Data (Predefined sweatshirts)
  const fallbackProducts = [
    { id: 1, img: './Sweatshirts/s1.jpg', price: 1999 },
    { id: 2, img: './Sweatshirts/s2.jpg', price: 1099 },
    { id: 3, img: './Sweatshirts/s3.jpg', price: 1199 },
    { id: 4, img: './Sweatshirts/s4.jpg', price: 1299 },
    { id: 5, img: './Sweatshirts/s5.jpg', price: 1499 },
    { id: 6, img: './Sweatshirts/s6.jpg', price: 1599 },
    { id: 7, img: './Sweatshirts/s7.jpg', price: 1699 },
    { id: 8, img: './Sweatshirts/s8.jpg', price: 1399 },
    { id: 9, img: './Sweatshirts/s9.jpg', price: 1599 },
    { id: 10, img: './Sweatshirts/s10.jpg', price: 1899 },
    { id: 11, img: './Sweatshirts/s11.jpg', price: 1299 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Sweatshirts")
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
    return <div>Loading Sweatshirts...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <h2>Sweatshirts Collection</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product" key={product.id || index}>
            <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`Sweatshirt ${product.id || index}`} />
            <p>MRP: ₹{product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sweatshirts;