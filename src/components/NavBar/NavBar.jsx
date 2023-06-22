import React from 'react';
import SearchBar from './SearchBar';
import styles from './NavBar.module.css';
import { setLoadingIndicatorVisibility } from '../Loader/Loader';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = ({ handleChange, handleSearch, search }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <nav>
        <div
          className={styles.logo}
          onClick={() => {
            if (pathname === '/') {
              return;
            }
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
