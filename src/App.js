import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Navigation from './components/NavBar/navbar';
import SearchResult from './components/searchpage/search';
import MovieInfo from './components/Informations/movieinfo';
import Footer from './components/homepage/footer';
import PersonInfo from './components/Informations/personInfo';
import HomePage from './Pages/HomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      searchedMovies: [],
      search: '',
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ load: true });
    });
  }
  componentWillUnmount() {
    window.removeEventListener('load');
  }

  //BUTTON FUNCTIONS
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.search !== '') {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}
        `,
      )
        .then((data) => data.json())
        .then((data) => {
          this.setState({ searchedMovies: [...data.results] });
        });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div
          className="preloader"
          style={this.state.load ? { opacity: 0 } : { opacity: 1 }}
        ></div>
        <div
          className="document"
          style={this.state.load ? { opacity: 1 } : { opacity: 0 }}
        >
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Fragment>
                  <Navigation
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    search={this.state.search}
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
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    movies={this.state.searchedMovies}
                    search={this.state.search}
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
  }
}

export default App;
