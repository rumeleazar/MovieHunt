import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';



const Navigation = ({handleChange, handleSearch, search}) => {
  return (
    <div className={styles.navbar}>
      <nav>
        <div className={styles.logo}>
          <Link to="/">
            <h1>FLIX</h1>
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

