import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./VirtualTryOn.css"; // Import the CSS file

// Import images
import t7 from "./Tshirts/t7.jpg";
import img21 from './pics/21.jpg';
import k9 from "./kurthas/9.jpg";
import h4 from './Hoodies/h4.jpg';
import j6 from './Jeans/j6.jpg';
import s3 from './Sweatshirts/s3.jpg';
import img9 from './pics/9.jpg';
import f7 from './Formals/f7.jpg';
import deals from './deals.png';

const categories = [
  { name: "Tshirts", discount: "40-80% OFF", img: t7 },
  { name: "Shirts", discount: "40-80% OFF", img: img9 },
  { name: "Jeans", discount: "40-80% OFF", img: j6 },
  { name: "Kurthas", discount: "50-80% OFF", img: k9 },
  { name: "Trousers", discount: "40-80% OFF", img: t7 },
  { name: "Sweatshirts", discount: "UP TO 80% OFF", img: s3 },
  { name: "Formals", discount: "UP TO 70% OFF", img: f7 },
  { name: "Hoodies", discount: "40-80% OFF", img: h4 },
  { name: "Track Pants", discount: "UP TO 80% OFF", img: img21 },
];

const VirtualTryOn = () => {
  return (
    <div className="shop-by-category">
      <div className="deals">
        <img src={deals} alt="Deals" />
      </div>

      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.img} alt={category.name} />
            <div className="category-card-content">
              <h3>{category.name}</h3>
              <p>{category.discount}</p>
              {/* Dynamic Link for each category */}
              <Link to={`/products/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
              
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualTryOn;
