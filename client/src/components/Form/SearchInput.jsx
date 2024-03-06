import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/NavStyles.css";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  console.log(search);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/search-product/${search.keyword}`
      );
      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.log("error in SearchInput/handleSubmit", error);
    }
  };
  return (
    <div>
      <form role="search" className="d-flex" onSubmit={handleSubmit}>
        <div className="inputBx inputNav">
          <span></span>
          <input
            type="search"
            className="me-2 navsearch"
            aria-label="Search"
            placeholder="Search"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          />
        </div>
        <button className="btn btn-outline-success navsearchbtn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
