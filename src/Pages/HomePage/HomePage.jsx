import React, { useState, useEffect, useContext, useRef } from 'react';
import { StoreContext } from '../../Services/Store/store';
import Carousel from '../../components/HomePage/Carousel/Carousel';
import HeroCarousel from '../../components/HomePage/Hero/Hero';
import Grid from '../../components/Grid/Grid';
import GenreCarousel from '../../components/HomePage/GenreCarousel/GenreCarousel';
import Dropdown from '../../components/Dropdown/Dropdown';
import ListingNavigation from '../../components/HomePage/ListingNavigation/ListingNavigation.';
import { fetchHomePageData, fetchGenres } from '../../Services/Api/HomePageApi';
import {
  onListingButtonClick,
  onDiscoverListingButtonClick,
  onGenreButtonClick,
} from '../../Services/HomePageHelpers/utils';
import { setLoadingIndicatorVisibility } from '../../components/Loader/Loader';
import styles from './HomePage.module.css';

const listings = ['Popular', 'Now Playing', 'Top Rated', 'Upcoming'];

const discoverListings = ['Movies', 'Series'];

const HomePage = () => {
  const { storeData, setStoreData } = useContext(StoreContext);
  const [marqueeData, setMarqueeData] = useState([]);
  const [individualCarousel, setIndividualCarousel] = useState([]);
  const [discoverGenre, setDiscoverGenre] = useState([]);
  const [activeCarouselGenre, setActiveCarouselGenre] = useState([]);
  const [discoverData, setDiscoverData] = useState([]);
  const [activeListing, setActiveListing] = useState(0);
  const [discoverListing, setDiscoverListing] = useState(0);
  const genreRef = useRef([]);
  const onListingClickProps = {
    storeData,
    setStoreData,
    setIndividualCarousel,
    setActiveListing,
  };

  const onDiscoverListingClickProps = {
    setActiveCarouselGenre,
    setDiscoverGenre,
    setDiscoverData,
    setDiscoverListing,
    genreRef,
    storeData,
    setStoreData,
  };

  const onGenreButtonClickProps = {
    activeCarouselGenre,
    discoverListing,
    setActiveCarouselGenre,
    setDiscoverData,
  };
  useEffect(() => {
    fetchGenres()
      .then((data) => {
        genreRef.current = data;
      })
      .finally(() => {
        setDiscoverGenre(genreRef.current[0]);
      });
    fetchHomePageData()
      .then((data) => {
        setStoreData({
          homePage: {
            popular: data?.carouselData[0],
            trending: data?.carouselData[1],
          },
        });
        setIndividualCarousel(data?.carouselData[0]);
        setDiscoverData(data?.carouselData[1]);
        setMarqueeData(data?.marquee);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setLoadingIndicatorVisibility(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!marqueeData) {
    return null;
  }

  return (
    <>
      {marqueeData && <HeroCarousel marqueeData={marqueeData?.results} />}
      <ListingNavigation
        onClickProps={onListingClickProps}
        listings={listings}
        onClick={onListingButtonClick}
        activeListing={activeListing}
      />
      {individualCarousel?.results?.length ? (
        <Carousel
          movies={individualCarousel?.results}
          key={individualCarousel?.title}
        />
      ) : null}
      <ListingNavigation
        onClickProps={onDiscoverListingClickProps}
        listings={discoverListings}
        onClick={onDiscoverListingButtonClick}
        activeListing={discoverListing}
      />
      {discoverGenre?.genres?.length ? (
        <>
          <GenreCarousel
            onClickProps={onGenreButtonClickProps}
            genres={discoverGenre?.genres}
            activeGenres={activeCarouselGenre}
            onClick={onGenreButtonClick}
            key={`genre-listing-${discoverListing}`}
          />

          <Dropdown
            onClickProps={onGenreButtonClickProps}
            genresData={discoverGenre?.genres}
            onClick={onGenreButtonClick}
            activeGenres={activeCarouselGenre}
          />
        </>
      ) : null}
      {discoverData?.results?.length ? (
        <>
          <Grid gridData={discoverData?.results.slice(0, 18)} />
          <div className={styles.viewMoreButton}>
            {`View All ${discoverListings[discoverListing]} `}
            <span className={styles.viewMoreArrow} />
            <span className={styles.viewMoreArrow} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.noMatchFound}>
            <h1>{`No exact matches found! Sorry :(`}</h1>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
