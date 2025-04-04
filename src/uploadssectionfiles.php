import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ userId: "", password: "" });

    // Hardcoded admin credentials (Change these for security)
    const ADMIN_USERID = "mohansiva";
    const ADMIN_PASSWORD = "siv@siv@";

    const [formData, setFormData] = useState({
        image: null,
        price: "",
        details: "",
        category: "Kurthas"
    });

    const categories = ["Kurthas", "Jeans", "Hoodies", "Formals", "Tshirts", "Blazers", "WeddingCollection","Jackets","Gallery"];

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.userId === ADMIN_USERID && loginData.password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert("Invalid User ID or Password!");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", formData.image);
        data.append("price", formData.price);
        data.append("details", formData.details);
        data.append("category", formData.category);

        try {
            const res = await axios.post("http://localhost/clothing_store/api.php", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert(res.data.message || res.data.error);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="form-container">
            {!isAuthenticated ? (
                <div>
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <label>User ID:</label>
                        <input type="text" name="userId" value={loginData.userId} onChange={handleLoginChange} required />

                        <label>Password:</label>
                        <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />

                        <button type="submit">Login</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Add Product</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <label>Image:</label>
                        <input type="file" name="image" onChange={handleFileChange} required />

                        <label>Price:</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} required />

                        <label>Details:</label>
                        <textarea name="details" value={formData.details} onChange={handleChange} required />

                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <button type="submit">Add Product</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddProduct;






get products 

<?php
include 'db.php';

$house = isset($_GET['house']) ? $_GET['house'] : '';
$sql = "SELECT * FROM points WHERE house = '$house' ORDER BY created_at DESC";
$result = $conn->query($sql);

$points = [];
while ($row = $result->fetch_assoc()) {
    $points[] = $row;
}

header('Content-Type: application/json');
echo json_encode($points);
?>
