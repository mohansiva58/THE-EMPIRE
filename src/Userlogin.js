import React, { useState } from 'react';
import axios from 'axios';
import './Userlogin.css';

const Userlogin = () => {
    const [img, setImg] = useState(null);
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImg(reader.result); // Convert image to base64
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!img || !price || !details) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            // Save product to the database
            await axios.post('http://localhost:5000/api/products', {
                img,
                price: parseFloat(price),
                details,
            });
            alert("Product added successfully!");

            // Clear form fields
            setImg(null);
            setPrice('');
            setDetails('');
            setErrorMessage('');
        } catch (error) {
            console.error("Error adding product:", error.response ? error.response.data : error);
            alert(`Failed to add product: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className='mid'>
        <form onSubmit={handleSubmit}>
            <h1>Add Product</h1>

            <div>
                <label>Image: </label>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
            </div>

            <div>
                <label>Price: </label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Details: </label>
                <input
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                />
            </div>
            <div>
            <label for="options">Choose an option Where You add this Product:</label>
    <select id="options" name="options">
        <option value="option1">Kurthas</option>
        <option value="option2">Jeans</option>
        <option value="option3">Sweatshirt</option>
        <option value="option4">Hoodies</option>
        <option value="option1">Formals</option>
        <option value="option2">PremiumCollection</option>
        <option value="option3">Products</option>
        <option value="option4">Tshirts</option>
        <option value="option3">Blazers</option>
        <option value="option4">WeddingCollection</option>
    </select>
            </div>

            {errorMessage && <span className='error-message'>{errorMessage}</span>}

            <button type="submit">Add Product</button>
        </form>
        </div>
    );
};

export default Userlogin;
