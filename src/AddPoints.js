import { useState } from "react";
import axios from "axios";

const AddPoints = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ userId: "", password: "" });

    // Admin Credentials
    const ADMIN_USERID = "mohansiva";
    const ADMIN_PASSWORD = "siv@siv@";

    const [formData, setFormData] = useState({
        studentName: "",
        house: "Agni",  // Default house
        points: ""
    });

    const houses = ["Aakash", "Agni", "Vayu", "Jal", "Prudhvi"]; 

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost/clothing_store/api.php", formData, {
                headers: { "Content-Type": "application/json" }
            });

            alert(res.data.message || res.data.error);
            setFormData({ studentName: "", house: "Agni", points: "" }); // Reset form
        } catch (error) {
            console.error("Error adding points:", error);
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
                    <h2>Add Points</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Student Name:</label>
                        <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required />

                        <label>House:</label>
                        <select name="house" value={formData.house} onChange={handleChange} required>
                            {houses.map((house) => (
                                <option key={house} value={house}>{house}</option>
                            ))}
                        </select>

                        <label>Points:</label>
                        <input type="number" name="points" value={formData.points} onChange={handleChange} required />

                        <button type="submit">Add Points</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddPoints;
