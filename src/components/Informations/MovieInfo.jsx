import React, { useState, useEffect } from 'react';
import CastCarousel from './CastCarousel';
import Footer from '../HomePage/Footer/Footer';
import Navigation from '../NavBar/NavBar';
import ReactImageFallback from 'react-image-fallback';
import noimage from '../../assets/images/noimage.png';
import styles from './MovieInfo.module.css';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { setLoadingIndicatorVisibility } from '../Loader/Loader';

const MovieInfo = () => {
  const { movieid } = useParams();
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.REACT_APP_API}&language=en-US
      `,
    )
      .then((data) => data.json())
      .then((data) => {
        setFeaturedMovie(data);
        setGenres(data.genres);
      })
      .finally(() => {
        setTimeout(() => {
          setOnLoad(true);
          setLoadingIndicatorVisibility(false);
        }, 1000);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/reviews?api_key=${process.env.REACT_APP_API}`,
    )
      .then((data) => data.json())
      .then((data) => {
        setReviews([...data.results]);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange1 = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSearch1 = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div
      className={clsx(styles.movieInfoContainer, {
        [styles.onLoad]: onLoad,
      })}
    >
      <Navigation
        handleSearch={handleSearch1}
        handleChange={handleChange1}
        search={search}
      />

      <div className={styles.poster}>
        <div
          className={styles.posterHeader}
          style={
            onLoad
              ? {
                  backgroundImage: `url("https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  opacity: 1,
                }
              : { opacity: 0 }
          }
        >
          <div className={styles.posterHeaderInfo}>
            <ReactImageFallback
              src={`https://image.tmdb.org/t/p/w300${featuredMovie.poster_path}`}
              fallbackImage={noimage}
              alt="cool image should be here"
            />

            <div className={styles.posterInformation}>
              <h1>{featuredMovie.original_title}</h1>
              {genres.map((element, index) => (
                <p key={index}>{element.name}</p>
              ))}
            </div>
          </div>
        </div>
        <br></br>
        <div className={styles.posterSummary}>
          <h1>SUMMARY</h1>
          <p>{featuredMovie.overview}</p>
        </div>
        <br></br>
        <div className={styles.castSummary}>
          <h1>CAST</h1>
          {movieid ? (
            <CastCarousel
              id={movieid}
              carouselContainerClass={styles.castCarouselContainer}
              cardContainerClass={styles.castCardContainer}
            />
          ) : null}
        </div>
        <br></br>
        <div className={styles.reviewSection}>
          <h1>REVIEWS</h1>
          {reviews.map((review, index) => (
            <div className={styles.reviewCard} key={index}>
              <div className={styles.reviewAuthor}>{review.author}</div>
              <div className={styles.reviewContent}>{review.content}</div>
              <h2>
                <a href={review.url} rel="noopener noreferrer" target="_blank">
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
};

export default MovieInfo;
