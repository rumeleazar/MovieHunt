import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactImageFallback from 'react-image-fallback';
import { useNavigate } from 'react-router-dom';
import noimage from '../../assets/images/noimage.png';

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

const CastCarousel = (props) => {
  const [cast, setCast] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${process.env.REACT_APP_API}`,
    )
      .then((data) => data.json())
      .then((data) => {
        setCast(data.cast.slice(0, 20));
      });
  }, []);

  return (
    <div className="castCarouselContainer">
      <Slider {...settings}>
        {cast.map((castData, index) => (
          <div className="castCardContainer" key={index}>
            <a
              href={`/people/${castData.id}`}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/people/${castData.id}`);
              }}
            >
              <ReactImageFallback
                src={`https://image.tmdb.org/t/p/w300${castData.profile_path}`}
                fallbackImage={noimage}
                alt="cool image should be here"
              />

              <p>{castData.name}</p>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CastCarousel;
