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

const Tshirts = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fallback Data (Predefined T-shirts)
  const fallbackProducts = [
    { id: 1, img: './Tshirts/t1.jpg', price: 799 },
    { id: 2, img: './Tshirts/t2.jpg', price: 599 },
    { id: 3, img: './Tshirts/t3.jpg', price: 699 },
    { id: 4, img: './Tshirts/t4.jpg', price: 499 },
    { id: 5, img: './Tshirts/t5.jpg', price: 399 },
    { id: 6, img: './Tshirts/t6.jpg', price: 599 },
    { id: 7, img: './Tshirts/t7.jpg', price: 899 },
    { id: 8, img: './Tshirts/t8.jpg', price: 499 },
    { id: 9, img: './Tshirts/t9.jpg', price: 999 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/clothing_store/api.php?category=Tshirts")
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
    return <div>Loading T-shirts...</div>; // Skeleton loader or loading indicator
  }

  return (
    <div className="home">
      <h2>T-shirts Collection</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product" key={product.id || index}>
            <LazyImage src={product.img.startsWith('http') ? product.img : importImage(product.img)} alt={`T-shirt ${product.id || index}`} />
            <p>MRP: ₹{product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tshirts;