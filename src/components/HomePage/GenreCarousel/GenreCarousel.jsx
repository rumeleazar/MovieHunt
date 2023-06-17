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

const GenreCarousel = ({ genres, activeGenres, onClick, onClickProps }) => {
  const [leftNavArrowState, setLeftNavArrowState] = useState(false);
  const [rightNavArrowState, setRightNavArrowState] = useState(true);
  const afterSlideEvent = (_, nextSlide) => {
    setRightNavArrowState(nextSlide !== genres?.length - 10);
    setLeftNavArrowState(nextSlide !== 0);
  };

  const prevArrow = (
    <NavigationArrow
      customClassName={styles.genreLeftNavArrow}
      arrowClassName={clsx(
        leftNavArrowState
          ? styles.genreLeftArrow
          : styles.genreLeftArrowInactive,
      )}
    />
  );

  const nextArrow = (
    <NavigationArrow
      customClassName={styles.genreRightNavArrow}
      arrowClassName={clsx(
        rightNavArrowState
          ? styles.genreRightArrow
          : styles.genreRightArrowInactive,
      )}
    />
  );

  const modifiedSettings = {
    ...settings,
    beforeChange: afterSlideEvent,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
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
                onClick={() => onClick({ ...onClickProps, genreId: data.id })}
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
