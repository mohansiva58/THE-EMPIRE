import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchWithResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null); // To detect outside clicks

  // Categories with respective routes
  const categories = [
    "Jeans",
    "Hoodies",
    "Sweatshirts",
    "T-Shirts",
    "Wedding Collection",
    "Kurthas",
    "Premium Collection",
    "Formals",
    "Blazers",
    "Jackets",
  ];

  const categoryRoutes = {
    jeans: "/products/jeans",
    hoodies: "/products/hoodies",
    sweatshirts: "/products/sweatshirts",
    "t-shirts": "/products/t-shirts",
    "wedding collection": "/WeddingCollection",
    kurthas: "/products/kurthas",
    "premium collection": "/PremiumCollection",
    formals: "/products/formals",
    blazers: "/Blazers",
    jackets: "/Jackets",
  };

  // Filter results dynamically
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = categories.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  // Handle search submission (optional)
  const handleSearch = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      handleItemClick(results[0]); // Auto-select the first result
    }
  };

  // Handle item click and navigate
  const handleItemClick = (item) => {
    const route = categoryRoutes[item.toLowerCase()];
    if (route) {
      navigate(route);
      setQuery(""); // Clear input after selection
      setShowResults(false);
    } else {
      navigate("/not-found");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto mt-4" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Search for products..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleItemClick(result)}
            >
              {result}
            </div>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 p-4 text-gray-500">
          No items found.
        </div>
      )}
    </div>
  );
};

export default SearchWithResults;
