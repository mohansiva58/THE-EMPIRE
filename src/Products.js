import './allcss.css';
import React, { lazy, Suspense } from 'react';

// Lazy load images
const LazyImage = ({ src, alt }) => (
  <Suspense fallback={<div className="image-placeholder">Loading...</div>}>
    <img src={src} alt={alt} />
  </Suspense>
);

// Function to dynamically import images
const importImage = (imagePath) => lazy(() => import(`${imagePath}`));

const Products = ({ addToCart }) => {
  const products = [
    { id: 1, img: './pics/9.jpg', price: 1099 },
    { id: 2, img: './pics/10.jpg', price: 999 },
    { id: 3, img: './pics/11.jpg', price: 1999 },
    { id: 4, img: './pics/12.jpg', price: 1299 },
    { id: 5, img: './pics/13.jpg', price: 1199 },
    { id: 6, img: './pics/14.jpg', price: 1099 },
    { id: 7, img: './pics/15.jpg', price: 1799 },
    { id: 8, img: './pics/16.jpg', price: 999 },
    { id: 9, img: './pics/17.jpg', price: 1499 },
    { id: 10, img: './pics/18.jpg', price: 1599 },
    { id: 11, img: './pics/19.jpg', price: 1999 },
    { id: 12, img: './pics/20.jpg', price: 1399 },
    { id: 13, img: './pics/21.jpg', price: 1299 },
    { id: 14, img: './pics/22.jpg', price: 1499 },
    { id: 15, img: './pics/23.jpg', price: 1099 },
    { id: 16, img: './pics/24.jpg', price: 1199 },
  ];

  return (
    <div className="home">
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <LazyImage src={importImage(product.img)} alt={`Product ${product.id}`} />
            <p>MRP: {product.price}</p>
            <p>Sizes: S-M-L-XL</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;