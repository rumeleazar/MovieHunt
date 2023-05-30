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
  slidesToShow: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 6000,
  nextArrow: <Arrow />,
  prevArrow: <Arrow />,
  lazyLoad: 'anticipated',
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
     <div className={styles.heroBottomOverlay}/>
     <div className ={styles.heroCarouselContainer}>
        <Slider {...settings}>
          {props.marqueeData?.map(
            (movie, index) => (
              <div key ={index}>
              <div className={styles.heroContainer}>
                <div className={styles.heroOverlay}/>
                <div className={styles.heroImage}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt="this is the card pic"
                  />
                </div>
                <div className = {styles.metadataContainer}>
                  <div className = {styles.heroHeader}>{movie.title} ({` ${movie.release_date.slice(0, 4)} `})</div>
                  <div className = {styles.subHeader}>Now playing</div>
                  <div className ={styles.overView}>{movie.overview}</div>
                </div>
              </div>
            
            </div>
            )
          )}
        </Slider>
      </div>
    </div>

  );

}

export default HeroCarousel;
