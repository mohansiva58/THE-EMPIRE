import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Ensure your CSS is imported
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel'; 
import Footer from './Footer';
import Address from './Address';
import Navbar from './Navbar';
import VirtualTryOn from './VirtualTryOn';
import CategoryPage from './CategoryPage';
import Inner from './Inner';
import WeddingCollection from './WeddingCollection';
import Collaborations from './Collaborations.js';
import PremiumCollection from './PremiumCollection.js';
import Hoodies from './Hoodies.js';
import Sweatshirts from './Sweatshirts.js';
import Jeans from './Jeans.js';
import Kurthas from './Kurthas.js';
import Tshirts from './Tshirts.js';
import Products from './Products.js';
import Formals from './Formals.js';
import Blazers from './Blazers.js';
import Jackets from './Jackets.js';
import Cart from './Cart.js';
import SearchWithResults from './Search.js';
import AddPoints from './AddPoints.js';
import ShoppingAssistant from "./ShoppingAssistant";
import Points from './Points';
import logoo from './logoo.png';
import slide1 from './pics/c1.png';
import slide2 from './pics/c2.png';
import slide3 from './c3.jpg';
import slide4 from './pics/c4.jpg';
import slide5 from './c5.jpg';
import slide6 from './c6.jpg';

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home addToCart={addToCart} />} />
                <Route path="/products" element={<Products addToCart={addToCart} />} />
                <Route path="/products/kurthas" element={<Kurthas addToCart={addToCart} />} />
                <Route path="/products/jeans" element={<Jeans addToCart={addToCart} />} />
                <Route path="/products/Sweatshirts" element={<Sweatshirts addToCart={addToCart} />} />
                <Route path="/products/Formals" element={<Formals addToCart={addToCart} />} />
                <Route path="/products/Tshirts" element={<Tshirts addToCart={addToCart} />} />
                <Route path="/products/Hoodies" element={<Hoodies addToCart={addToCart} />} />
                <Route path="/Collaborations" element={<Collaborations />} />
                <Route path="/Address" element={<Address />} />
                <Route path="/AddPoints" element={<AddPoints />} />
                <Route path="/PremiumCollection" element={<PremiumCollection addToCart={addToCart} />} />
                <Route path="/WeddingCollection" element={<WeddingCollection addToCart={addToCart} />} />
                <Route path="/Blazers" element={<Blazers addToCart={addToCart} />} />
                <Route path="/Jackets" element={<Jackets addToCart={addToCart} />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/VirtualTryOn" element={<VirtualTryOn />} />
                <Route path="/products/:categoryName" element={<CategoryPage />} />
                <Route path="/Inner" element={<Inner addToCart={addToCart} />} />
                <Route path="/Search" element={<SearchWithResults />} />
                <Route path='/points' element={<Points/>}/>
            </Routes>
            <Footer />
         
        </Router>
    );
};

const Home = ({ addToCart }) => {
    return (
        <div className="home-page">
            <Carousel className="carousel-container">
                <Carousel.Item>
                    <img className="d-block w-100" src={slide1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} alt="Third slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} alt="Fourth slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} alt="Fifth slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={ "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} alt="sixth slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} alt="seven slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2020&q=80"} alt="Eight slide" />
                </Carousel.Item>
            </Carousel>
            <VirtualTryOn />
            <ShoppingAssistant />
        </div>
    );
};

export default App;