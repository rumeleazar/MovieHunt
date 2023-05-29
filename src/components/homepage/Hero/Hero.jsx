import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from'./Hero.module.css';

const  Arrow = (props) => {
  const { className, style } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

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


const HeroCarousel = (props) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);

    return () => {
      setLoad(false);
    }
  }, [])


  return (
    <div
      className={styles.heroCarousel}
      style={
        load
          ? {
              opacity: 1,
            }
          : { opacity: 0 }
      }
    > 
 
      <Slider {...settings}>
        {props.marqueeData?.map(
          (movie, index) => (
            <div className={styles.heroContainer} key={index}>
              <div className={styles.heroOverlay}/>
              <div className={styles.someImage}>
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

export default HeroCarousel;
