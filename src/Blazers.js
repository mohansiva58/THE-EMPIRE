import React, { useState, useEffect } from "react";
import axios from "axios";
import './Blazers.css'; // Import your css file

// Wedding collection images
import w1 from "./Wedding/b1.png";
import w2 from "./Wedding/b2.png";
import w3 from "./Wedding/b3.png";
import w4 from "./Wedding/b4.png";

const Blazers = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOkButton, setShowOkButton] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const fallbackProducts = [
    { id: 1, img: w1, price: 1199 },
    { id: 2, img: w4, price: 1999 },
    { id: 3, img: w3, price: 2299 },
    { id: 4, img: w2, price: 1299 },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost/myapp4/get_products.php?category=Blazers")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const newProducts = response.data.map((product, index) => ({
            id: product.id || `new-${index}`,
            img: product.image || null,
            price: product.price || "N/A",
          }));
          setProducts([...fallbackProducts, ...newProducts]);
        } else {
          setProducts(fallbackProducts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts(fallbackProducts);
        setLoading(false);
      });
  }, []);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setNotificationMessage(`Add ${product.id} to cart?`);
    setShowOkButton(true);
  };

  const handleOkClick = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      setSelectedProduct(null);
      setShowOkButton(false);
      setNotificationMessage('');
    }
  };

  const SkeletonLoader = () => (
    <div className="product skeleton-loader">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-button"></div>
    </div>
  );

  return (
    <div className="home">
      <h2>Blazers Collection</h2>
      <div className="product-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : products.map((product) => (
              <div className="product" key={product.id}>
                <img
                  src={product.img && product.img.startsWith("http") ? product.img : product.img === w1 ? w1 : product.img === w2 ? w2 : product.img === w3 ? w3 : product.img === w4 ? w4 : ""}
                  alt={`Blazer ${product.id}`}
                />
                <p>MRP: {product.price}</p>
                <p>Sizes: S-M-L-XL</p>
                <button onClick={() => handleAddToCartClick(product)}>Add to Cart</button>
              </div>
            ))}
      </div>
      {showOkButton && selectedProduct && (
        <div className="cart-alert">
          <h2>{notificationMessage}</h2>
          <img src={selectedProduct.img} alt={`Product ${selectedProduct.id}`} width="100" height="100" />
          <div className="cart-alert-actions">
            <button onClick={handleOkClick}>OK</button>
            <button onClick={() => setShowOkButton(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blazers;