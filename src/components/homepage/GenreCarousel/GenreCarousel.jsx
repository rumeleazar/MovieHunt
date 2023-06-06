import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { clsx } from 'clsx';
import styles from './GenreCarousel.module.css';

const NavigationArrow = ({
  className,
  onClick,
  customClassName,
  arrowClassName,
}) => {
  return (
    <div
      className={clsx(!customClassName ? className : customClassName)}
      onClick={onClick}
    >
      <div className={arrowClassName} />
    </div>
  );
};

const settings = {
  nextArrow: (
    <NavigationArrow
      customClassName={styles.genreRightNavArrow}
      arrowClassName={styles.genreRightArrow}
    />
  ),

  infinite: false,
  speed: 500,
  slidesToShow: 10,
  centerPadding: '110px',
  slidesToScroll: 1,
  centerMode: false,
  draggable: false,
  responsive: [
    {
      breakpoint: 1290,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        centerPadding: '85px',
        centerMode: false,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '85px',
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
        slidesToShow: 2.4,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      },
    },
  ],
};

const GenreCarousel = ({ genres, activeGenres, onClick }) => {
  const [navArrowState, setNavArrowState] = useState(false);
  const afterSlideEvent = (_, nextSlide) => {
    setNavArrowState(nextSlide !== 0);
  };

  const prevArrow = (
    <NavigationArrow
      customClassName={styles.genreLeftNavArrow}
      arrowClassName={clsx(
        navArrowState ? styles.genreLeftArrow : styles.genreLeftArrowInactive,
      )}
    />
  );

  const modifiedSettings = {
    ...settings,
    beforeChange: afterSlideEvent,
    prevArrow: prevArrow,
  };
  return (
    <div className={styles.genreCarousel}>
      <Slider {...modifiedSettings}>
        {genres.map((data, index) => {
          const isGenreActive = activeGenres.includes(data?.id);
          return (
            <div className={styles.genreCard} key={index}>
              <div
                className={clsx(styles.genreButton, {
                  [styles.genreActive]: isGenreActive,
                })}
                onClick={() => onClick(data.id)}
              >
                {data.name}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default GenreCarousel;
