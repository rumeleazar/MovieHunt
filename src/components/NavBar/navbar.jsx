import React from "react";
import SearchBar from "./searchbar";
import { Link } from "react-router-dom";



const Navigation = ({handleChange, handleSearch, search}) => {
  return (
    <div className="navbar">
      <nav>
        <div className="logo">
          <Link to="/">
            <h1>MVHunt</h1>
          </Link>
        </div>
        <div>
          <SearchBar
            handleSearch={handleSearch}
            handleChange={handleChange}
            search={search}
          />
        </div>
      </nav>
    </div>
  );

}

export default Navigation;

