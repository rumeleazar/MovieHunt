import React, { Fragment, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Navigation from './components/NavBar/navbar';
import SearchResult from './components/searchpage/search';
import MovieInfo from './components/Informations/movieinfo';
import Footer from './components/homepage/footer';
import PersonInfo from './components/Informations/personInfo';
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

      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Fragment>
              <Navigation
                handleSearch={handleSearch}
                handleChange={handleChange}
                search={search}
              />
              <HomePage />
              <Footer />
            </Fragment>
          )}
        />
        <Route
          path="/search/:searchtitle"
          exact
          render={() => (
            <Fragment>
              <SearchResult
                handleSearch={handleSearch}
                handleChange={handleChange}
                movies={searchMovies}
                search={search}
              />
            </Fragment>
          )}
        />
        <Route path="/details/:movietitle/:movieid" component={MovieInfo} />
        <Route path="/people/:peopleid" component={PersonInfo} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
