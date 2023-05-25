import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Navigation from './components/NavBar/navbar';
import SearchResult from './components/searchpage/search';
import MovieInfo from './components/Informations/movieinfo';
import Footer from './components/homepage/footer';
import PersonInfo from './components/Informations/personInfo';
import HomePage from './Pages/HomePage';

const App = () => {
  const [load, setLoad] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoad(true);
  }, []);

  //BUTTON FUNCTIONS
  const handleChange = (e) => {
    setSearch({ search: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== '') {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}
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
      <div
        className="preloader"
        style={load ? { opacity: 0 } : { opacity: 1 }}
      ></div>
      <div className="document" style={load ? { opacity: 1 } : { opacity: 0 }}>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
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
            render={(props) => (
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
          <Route path="/newHome" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
