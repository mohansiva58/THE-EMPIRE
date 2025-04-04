import React, { useState, useEffect } from "react";
import axios from "axios";

const Points = () => {
    const [points, setPoints] = useState([]);
    const [house, setHouse] = useState("All");

    useEffect(() => {
        fetchPoints();
    }, [house]);

    const fetchPoints = async () => {
        try {
            const response = await axios.get(`http://localhost/clothing_store/api.php?house=${house}`);
            setPoints(response.data);
        } catch (error) {
            console.error("Error fetching points:", error);
        }
    };

    return (
        <div>
            <h2>Points Leaderboard</h2>
            
            <label>Select House:</label>
            <select value={house} onChange={(e) => setHouse(e.target.value)}>
                <option value="All">All Houses</option>
                <option value="Aakash">Aakash</option>
                <option value="Agni">Agni</option>
                <option value="Vayu">Vayu</option>
                <option value="Jal">Jal</option>
                <option value="Prudhvi">Prudhvi</option>
            </select>

            <table border="1">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>House</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((point, index) => (
                        <tr key={index}>
                            <td>{point.student_name}</td>  
                            <td>{point.house}</td>
                            <td>{point.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Points;
