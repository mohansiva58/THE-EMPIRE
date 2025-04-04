import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Address.css';

const AddressForm = () => {
  const location = useLocation();
  const [orderedItem, setOrderedItem] = useState(null);
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    paymentOption: ''
  });
  const [result, setResult] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [amount, setAmount] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (location.state?.orderedItem) {
      setOrderedItem(location.state.orderedItem);
    }
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, [location.state]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  const validateForm = () => {
    return address.fullName && address.email && address.phone && address.street && address.city && address.postalCode && address.paymentOption;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setResult("Please fill all required fields.");
      return;
    }

    setResult("Processing...");
    const dataToSend = { address, orderedItem };

    try {
      await axios.post('http://localhost:5000/save-address', dataToSend);
      await axios.post("https://api.web3forms.com/submit", {
        access_key: "81fb819f-aa25-4220-ad24-d5fd911ae68c",
        subject: `${address.fullName} placed an order`,
        redirect: "https://www.instagram.com",
        ...address
      });
      setResult("Order placed successfully!");
    } catch (error) {
      setResult("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className='address-page'>
      <h1>Shipping Address</h1>
      {orderedItem && (
        <div className='ordered-item-info'>
          <h2>Ordering item: {orderedItem.id} - ${orderedItem.price}</h2>
          <img src={orderedItem.img} alt={`Ordered item ${orderedItem.id}`} width='100' height='100' />
        </div>
      )}
      <div className='form-group'><label>Full Name</label><input type='text' name='fullName' value={address.fullName} onChange={handleChange} required /></div>
      <div className='form-group'><label>Email</label><input type='email' name='email' value={address.email} onChange={handleChange} required /></div>
      <div className='form-group'><label>Phone Number</label><input type='tel' name='phone' value={address.phone} onChange={handleChange} required /></div>
      <div className='form-group'><label>Street Address</label><input type='text' name='street' value={address.street} onChange={handleChange} required /></div>
      <div className='form-group'><label>City</label><input type='text' name='city' value={address.city} onChange={handleChange} required /></div>
      <div className='form-group'><label>Pin Code</label><input type='number' name='postalCode' value={address.postalCode} onChange={handleChange} required /></div>
      <div className='form-group payment-options'>
        <label>Payment Options</label>
        <select name='paymentOption' value={address.paymentOption} onChange={handleChange} required>
          <option value=''>Select a payment option</option>
          <option value='onlinePayment'>Online Payment</option>
          <option value='cashOnDelivery'>Cash on Delivery</option>
        </select>
      </div>
      {address.paymentOption === 'onlinePayment' && (
        <div className='online-payment-options'>
          <h3>UPI Payment Options</h3>
          <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' required />
          <button onClick={() => isMobile ? window.location.href = `upi://pay?pa=9701630276@ybl&pn=Your Store&am=${amount}&cu=INR` : alert("Scan the QR code instead.")}>Pay via UPI</button>
          {!isMobile && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9701630276@ybl&pn=Your Store&am=${amount}&cu=INR`} alt='UPI QR Code' />}
          <div className='form-group'><label>Upload Payment Proof</label><input type='file' onChange={handleFileChange} accept='image/*' required /></div>
        </div>
      )}
      <p>NOTE: SHIPPING CHARGES ARE 100 FOR EVERY DELIVERY.</p>
      <button type='button' onClick={handleSubmit}>Deliver to this Address</button>
      <span className="form-result">{result}</span>
    </div>
  );
};

export default AddressForm;
