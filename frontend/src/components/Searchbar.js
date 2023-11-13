import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css"

function Searchbar({ setProductsArray }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Search for products by their brand, name or category
  async function handleSearchbar(e) {
    e.preventDefault();
    try {
      await axios.get(`http://localhost:8000?search=${search}`).then((res) => {
        setProductsArray(res.data);
        navigate("/products");
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearchbar(e);
    }
  }

  return (
    <div className="searchbarContainer">
      <div className="innerSearchbarContainer">
        <input
          type="text"
          spellCheck={false}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="searchInput"
          placeholder="search product..."
        />
        <SearchIcon
          onClick={handleSearchbar}
          sx={{ fontSize: "2em" }}
          style={{ color: "#333" }}
        />
      </div>
    </div>
  );
}

export default Searchbar;
