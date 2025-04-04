import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get the category name from the URL

  return (
    <div>
      <h1>{categoryName.replace("-", " ")}</h1>
      <p>Explore our wide range of {categoryName.replace("-", " ")}!</p>
    </div>
  );
};

export default CategoryPage;
