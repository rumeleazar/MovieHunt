import React, { Fragment, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Navigation from './components/NavBar/navbar';
import SearchResult from './components/searchpage/search';
import MovieInfo from './components/Informations/MovieInfo';
import Footer from './components/HomePage/Footer';
import PersonInfo from './components/Informations/PersonInfo';
import HomePage from './Pages/HomePage';
import LoadingSpinner from './components/Loader/Loader';

const App = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState('');

  //BUTTON FUNCTIONS
  const handleChange = (e) => {
    setSearch({ search: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== '') {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API}&query=${search?.search}
        `,
      )
        .then((data) => data.json())
        .then((data) => {
          setSearchMovies({ searchedMovies: [...data.results] });
        });
    }
  };

  return (
    <BrowserRouter>
      <LoadingSpinner />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Fragment>
              <Navigation
                handleSearch={handleSearch}
                handleChange={handleChange}
                search={search}
              />
              <HomePage />
              <Footer />
            </Fragment>
          }
        />
        <Route
          path="/search/:searchtitle"
          exact
          element={
            <SearchResult
              handleSearch={handleSearch}
              handleChange={handleChange}
              movies={searchMovies}
              search={search}
            />
          }
        />
        <Route path="/details/:movietitle/:movieid" element={<MovieInfo />} />
        <Route path="/people/:peopleid" element={<PersonInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
