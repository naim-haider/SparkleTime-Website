import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/all-categories"
      );
      setCategories(data?.category);
    } catch (error) {
      console.log("error in getCategories/useCategory", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategory;
