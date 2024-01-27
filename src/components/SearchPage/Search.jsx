import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../HomePage/Footer/Footer';
import Navigation from '../NavBar/NavBar';
import LazyImageDefaultFallback from '../LazyImage/LazyImageDefaultFallback';
import { fetchMovieSearchData } from '../../Services/Api/SearchApi';
import { setLoadingIndicatorVisibility } from '../Loader/Loader';
import styles from './Search.module.css';

const SearchResults = ({ movies, search, handleChange }) => {
  const [searchResults, setSearchResults] = useState(search);
  const [moviesResults, setMoviesResults] = useState(movies);

  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (search?.search !== '') {
        fetchMovieSearchData(search?.search).then((data) => {
          setLoadingIndicatorVisibility(false);
          setMoviesResults({ searchedMovies: data.results });
          setSearchResults(search);
          setLoadingIndicatorVisibility(false);
        });
      }
    },
    [search],
  );

  return (
    <>
      <Navigation
        handleSearch={handleSearch}
        handleChange={handleChange}
        search={search}
      />
      <div className={styles.searchDescription}>
        <h1>SEARCH RESULTS FOR {searchResults?.search}</h1>
      </div>
      <div className={styles.searchDivider}></div>
      <div className={styles.searchContainer}>
        {moviesResults?.searchedMovies?.map((movie, index) => {
          return (
            <div className={styles.searchCardContainer} key={index}>
              <a
                href={`/details/movie/${movie.id}`}
                onClick={() => {
                  navigate(`/details/movie/${movie.id}`);
                }}
                style={{ cursor: 'pointer' }}
              >
                <LazyImageDefaultFallback
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                />

                <h1>{movie.title}</h1>
              </a>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
