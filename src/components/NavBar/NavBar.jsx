import React from 'react';
import SearchBar from './SearchBar';
import styles from './NavBar.module.css';
import { setLoadingIndicatorVisibility } from '../Loader/Loader';
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
            setLoadingIndicatorVisibility(true);
          }}
        >
          <h1>MVhunt</h1>
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
