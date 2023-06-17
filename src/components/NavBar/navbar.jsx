import React from 'react';
import SearchBar from './SearchBar';
import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ handleChange, handleSearch, search }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <nav>
        <div
          className={styles.logo}
          onClick={() => {
            navigate('/');
          }}
        >
          <h1>FLIX</h1>
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
};

export default Navigation;
