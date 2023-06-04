import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactImageFallback from 'react-image-fallback';
import noimage from '../../assets/images/noimage.png';

class CastCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: [],
    };
    this.apiKey = this.apiKey = process.env.REACT_APP_API;
  }
  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}/credits?api_key=${this.apiKey}
          `,
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ cast: data.cast.slice(0, 20) });
      });
  }

  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      swipeToSlide: false,
      draggable: false,
      responsive: [
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
      <div className="castCarouselContainer">
        <Slider {...settings}>
          {this.state.cast.map((cast, index) => (
            <div className="castCardContainer" key={index}>
              <a
                href={`/people/${cast.id}`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.props.history.push(`/people/${cast.id}`);
                }}
              >
                <ReactImageFallback
                  src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                  fallbackImage={noimage}
                  alt="cool image should be here"
                />

                <p>{cast.name}</p>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default CastCarousel;
