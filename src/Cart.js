import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, setCartItems }) => {
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderedItems, setOrderedItems] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const handlePlaceAllOrders = () => {
        setOrderSuccess(true);
        setOrderedItems([...cartItems]);

        let totalDiscount = 0;
        let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        if(couponCode === 'SAVE10'){
            totalDiscount = discount;
            totalPrice = totalPrice - discount;
        }

        alert(`Orders placed for all items. Total Price: $${totalPrice}`);

        navigate('/Address', { state: { orderedItems: cartItems, discountedPrice: totalPrice } });
        setCartItems([]);
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
    };

    const handleApplyCoupon = () => {
        if (couponCode === 'SAVE10') {
            setDiscount(10); // Apply $10 discount
            alert('Coupon applied! You saved $10.');
        } else {
            alert('Invalid coupon code.');
        }
    };

    const handleCloseSuccess = () => {
        setOrderSuccess(false);
        setOrderedItems([]);
    };

    return (
        <div className="container">
            {orderSuccess && orderedItems.length > 0 && (
                <div className="overlay" onClick={handleCloseSuccess}>
                    <div className="success-message">
                        <h2>Your orders were placed successfully ✔</h2>
                        <p>Thank you for your purchase of ${cartItems.reduce((total, item) => total + item.price, 0) - discount}.</p>
                        {orderedItems.map((item) => (
                          <div key={item.id}>
                            <img src={item.img} alt={`Ordered item ${item.id}`} width="100" height="100" />
                          </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="product-section">
                <h2>Cart Items</h2>

                <ul className="product-list">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <li key={index} className="product-item">
                                <img src={item.img} alt={`Product ${item.id}`} />
                                <div className="product-details">
                                    <h4>Product {item.id}</h4>
                                    <p className="price">Price: ${item.price}</p>
                                </div>
                                <div className="product-actions">
                                    <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Your cart is empty..<br />Add items you want</p>
                    )}
                </ul>
            </div>

            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-item">
                    <span>Total Items:</span>
                    <span>{cartItems.length}</span>
                </div>
                <div className="summary-item">
                    <span>Total Price:</span>
                    <span>${cartItems.reduce((total, item) => total + item.price, 0) - discount}</span>
                </div>
                <div className="coupon-section">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon}>Apply Coupon</button>
                </div>
                <div className="place-order">
                    <button
                        className="place-order-button"
                        onClick={handlePlaceAllOrders}
                    >
                        Place All Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;