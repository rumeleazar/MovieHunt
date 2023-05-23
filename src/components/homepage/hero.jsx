import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Arrow(props) {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

class HeroCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      load: true,
    };

  }


  render() {
    const settings = {
      infinite: true,
      fade: true,
      lazyLoad: true,
      slidesToShow: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      nextArrow: <Arrow />,
      prevArrow: <Arrow />,
    };



    return (
      <div
        className="heroCarousel"
        style={
          this.state.load
            ? {
                opacity: 1,
              }
            : { opacity: 0 }
        }
      >
        <Slider {...settings}>
          {this.props.marqueeData?.map(
            (movie, index) => (
              <div className="heroContainer" key={index}>
                <div className="someImage">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt="this is the card pic"
                  ></img>
                </div>
                <h3>Now Playing</h3>
                <h1>
                  {movie.title} ({` ${movie.release_date.slice(0, 4)} `})
                </h1>
                <p>{movie.overview}</p>
              </div>
            ),
            this
          )}
        </Slider>
      </div>
    );
  }
}

export default HeroCarousel;
