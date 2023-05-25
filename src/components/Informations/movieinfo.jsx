import React, { Component } from "react";
import CastCarousel from "./castcarousel";
import Footer from "../homepage/footer";
import Navigation from "../NavBar/navbar";
import ReactImageFallback from "react-image-fallback";
import noimage from "../../assets/images/noimage.png";
import { setLoadingIndicatorVisibility } from "../Loader/Loader";

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredMovie: [],
      genres: [],
      reviews: [],
      id: this.props.match.params.movieid,
      search: "",
      load: false,
    };
    this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieid}?api_key=${this.apiKey}&language=en-US
      `
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ featuredMovie: data });
        this.setState({ genres: data.genres });
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieid}/reviews?api_key=${this.apiKey}`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ reviews: [...data.results] });
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
      <div>
        <Navigation
          handleSearch={this.handleSearch1}
          handleChange={this.handleChange1}
          search={this.state.search}
        />

        <div className="poster">
          <div
            className="posterHeader"
            style={
              this.state.load
                ? {
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${this.state.featuredMovie.backdrop_path}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
          >
            <div
              className="posterHeaderInfo"
              style={
                this.state.load
                  ? {
                      opacity: 1,
                    }
                  : { opacity: 0 }
              }
            >
              <ReactImageFallback
                src={`https://image.tmdb.org/t/p/w300${this.state.featuredMovie.poster_path}`}
                fallbackImage={noimage}
                alt="cool image should be here"
              />

              <div className="posterInformation">
                <h1>{this.state.featuredMovie.original_title}</h1>
                {this.state.genres.map((element, index) => (
                  <p key={index}>{element.name}</p>
                ))}
              </div>
            </div>
          </div>
          <br></br>
          <div
            className="posterSummary"
            style={
              this.state.load
                ? {
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
          >
            <h1>SUMMARY</h1>
            <p>{this.state.featuredMovie.overview}</p>
          </div>
          <br></br>
          <div
            className="castSummary"
            style={
              this.state.load
                ? {
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
          >
            <h1>CAST</h1>
            <CastCarousel id={this.state.id} />
          </div>
          <br></br>
          <div
            className="reviewSection"
            style={
              this.state.load
                ? {
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
          >
            <h1>REVIEWS</h1>
            {this.state.reviews.map((review, index) => (
              <div className="reviewCard" key={index}>
                <div className="reviewAuthor">{review.author}</div>
                <div className="reviewContent">{review.content}</div>
                <h2>
                  <a
                    href={review.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    See full review
                  </a>
                </h2>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MovieInfo;
