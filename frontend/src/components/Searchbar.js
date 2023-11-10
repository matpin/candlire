import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Searchbar({ setProductsArray }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Search for products by their brand, name or category
  async function handleSearchbar(e) {
    e.preventDefault();
    try {
      await axios
        .get(`http://localhost:8000?search=${search}`)
        .then((res) => {
          setProductsArray(res.data);
          navigate("/");
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
    <div>
      <input
        type="text"
        spellCheck={false}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        onClick={handleSearchbar}
        sx={{ fontSize: "2.2em" }}
        style={{ color: "#79031d" }}
      />
    </div>
  );
}

export default Searchbar;
