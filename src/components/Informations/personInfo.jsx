import React, { Component } from "react";
import Footer from "../homepage/footer";
import Navigation from "../NavBar/navbar";
import { setLoadingIndicatorVisibility } from "../Loader/Loader";

class PersonInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: [],
      moviesCasted: [],
      popularMovies: [],
      gender: "",
      age: "",
      search: "",
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/person/${this.props.match.params.peopleid}?api_key=${this.apiKey}&language=en-US`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ person: data });
        const gender = this.state.person.gender === 2 ? "Male" : "Female";
        this.setState({ gender: gender });
        if (this.state.person.birthday) {
          const age = 2020 - this.state.person.birthday.slice(0, 4);
          this.setState({ age: age });
        }
      });

    fetch(
      `https://api.themoviedb.org/3/person/${this.props.match.params.peopleid}/movie_credits?api_key=${this.apiKey}&language=en-US`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ moviesCasted: data });
        const x = this.state.moviesCasted.cast.filter(function (movies) {
          return movies.popularity > 13;
        });
        this.setState({ popularMovies: x.splice(0, 6) });
      });

    window.addEventListener("load", () => {
      this.setState({ load: true });
      setLoadingIndicatorVisibility(false);
    });
  }

  handleChange1 = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSearch1 = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div
        className="personInformation"
        style={
          this.state.load
            ? {
                opacity: 1,
              }
            : { opacity: 0 }
        }
      >
        <Navigation
          handleSearch={this.handleSearch1}
          handleChange={this.handleChange1}
          search={this.state.search}
        />
        <div className="personBio">
          <img
            src={`https://image.tmdb.org/t/p/original/${this.state.person.profile_path}`}
            alt="this is the card pic"
          ></img>
          <div className="personInfoblock">
            <h1>{this.state.person.name}</h1>
            <h2>Born in {this.state.person.place_of_birth}</h2>
            <h2> Age: {this.state.age}</h2>
            <h2>{this.state.gender}</h2>
            <br></br>
            <h1>Biography</h1>
            <p>{this.state.person.biography}</p>
          </div>
        </div>
        <div className="popularMovies">
          <h1>Popular Movies</h1>
          {this.state.popularMovies.map((movie, index) => (
            <div className="popMoviesCard" key={index}>
              <a
                href={`/details/${movie.title}/${movie.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.history.push(
                    `/details/${movie.title}/${movie.id}`
                  );
                }}
              >
                <div className="popMoviesCardImage">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="this is the card pic"
                  ></img>
                </div>
                <div className="popMoviesDescription">
                  <h1>{movie.original_title}</h1>
                  <p>{movie.overview}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default PersonInfo;
