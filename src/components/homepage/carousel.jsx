import React, { Component } from "react";
import ReactImageFallback from "react-image-fallback";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noimage from "../../assets/images/noimage.png";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformValue: 0,
      rightValue: 0,
      load: false,
    };
  }

  componentWillMount() {
    this.setState({ load: true });
  }

  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      draggable: false,
      responsive: [
        {
          breakpoint: 1260,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div
        className="carousel"
        style={
          this.state.load
            ? {
                opacity: 1,
              }
            : { opacity: 0 }
        }
      >
        <Slider {...settings}>
          {this.props.movies.map((movie, index) => (
            <div className="cardContainer" key={index}>
              <a
                href={`/details/${movie.title}/${movie.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.history.push(
                    `/details/${movie.title}/${movie.id}`
                  );
                }}
              >
                <ReactImageFallback
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  fallbackImage={noimage}
                  alt="cool image should be here"
                />

                <p>{movie.title}</p>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
