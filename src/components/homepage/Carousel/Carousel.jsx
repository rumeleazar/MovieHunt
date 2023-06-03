import React, { useState, useEffect } from "react";
import ReactImageFallback from "react-image-fallback";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { clsx } from 'clsx';
import noimage from "../../../assets/images/noimage.png";
import styles from "./Carousel.module.css";


const NavigationArrow = ({className, onClick, customClassName, arrowClassName}) => {
    return (<div className={clsx(!customClassName ? className :customClassName )} onClick={onClick} ><div className={arrowClassName}/></div>);
}

const settings = {
  nextArrow: <NavigationArrow customClassName = {styles.rightNavArrow} arrowClassName = {styles.rightArrow} />,
  prevArrow: <NavigationArrow customClassName = {styles.leftNavArrow} arrowClassName = {styles.leftArrow} />,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  lazyLoad: true,
  centerPadding: "85px",
  slidesToScroll: 1,
  centerMode: true,
  draggable: false,
  responsive: [
    {
      breakpoint: 1290,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        centerPadding: "85px",
        centerMode: true,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: "85px",
        centerMode: true,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: true,
        infinite: true,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
      },
    },
  ],
};



const Carousel = (props) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  },[])


  return (
    <div className = {styles.carouselContainer}>
      <div
        className= {styles.carousel}
        style={
          load
            ? {
                opacity: 1,
              }
            : { opacity: 0 }
        }
      >
        <Slider {...settings}>
          {props.movies.map((movie, index) => (
            <div className= {styles.cardContainer} key={index} style={{ width: 253 }}>
              <a
                href={`/details/${movie.title}/${movie.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(
                    `/details/${movie.title}/${movie.id}`
                  );
                }}
              >
                <ReactImageFallback
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  fallbackImage={noimage}
                  alt="cool image should be here"
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
 }


export default Carousel;
