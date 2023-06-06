import React, { useState, useEffect, useContext, useRef } from 'react';
import { StoreContext } from '../Services/Store/store';
import Carousel from '../components/HomePage/Carousel/Carousel';
import HeroCarousel from '../components/HomePage/Hero/Hero';
import Grid from '../components/Grid/Grid';
import GenreCarousel from '../components/HomePage/GenreCarousel/GenreCarousel';
import ListingNavigation from '../components/HomePage/ListingNavigation/ListingNavigation.';
import {
  fetchHomePageData,
  fetchIndividualCarousel,
  fetchDiscoverCarousel,
  fetchGenres,
} from '../Services/Api/HomePageApi';
import { setLoadingIndicatorVisibility } from '../components/Loader/Loader';
import styles from './HomePage.module.css';

const listings = ['Popular', 'Now Playing', 'Top Rated', 'Upcoming'];
const listingMapper = {
  movies: 'movie',
  series: 'tv',
};
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

  const onListingButtonClick = async (listingName, index) => {
    const listingParam = listingName.toLowerCase().replaceAll(' ', '_');
    if (!storeData.homePage[listingParam]) {
      const newCarouselData = await fetchIndividualCarousel(listingParam);
      setStoreData({
        homePage: {
          ...storeData.homePage,
          [listingParam]: newCarouselData,
        },
      });
      setIndividualCarousel(newCarouselData);
    } else {
      setIndividualCarousel(storeData.homePage[listingParam]);
    }
    setActiveListing(index);
  };

  const onDiscoverListingButtonClick = async (listingName, index) => {
    setActiveCarouselGenre([]);
    setDiscoverGenre(genreRef.current[index]);
    const listingParam = listingName.toLowerCase().replaceAll(' ', '_');

    if (!storeData.homePage[listingParam]) {
      const newDiscoverData = await fetchDiscoverCarousel(
        listingMapper[listingParam],
      );
      setStoreData({
        homePage: {
          ...storeData.homePage,
          [listingParam]: newDiscoverData,
        },
      });
      setDiscoverData(newDiscoverData);
    } else {
      setDiscoverData(storeData.homePage[listingParam]);
    }

    setDiscoverListing(index);
  };

  const onGenreButtonClick = async (genreId) => {
    let genreList = activeCarouselGenre;
    const listingParam =
      listingMapper[
        discoverListings[discoverListing].toLowerCase().replaceAll(' ', '_')
      ];

    if (genreList.includes(genreId)) {
      genreList = genreList.filter((data) => data !== genreId);
      setActiveCarouselGenre(genreList);
    } else {
      genreList = [...genreList, genreId];
      setActiveCarouselGenre(genreList);
    }

    const newDiscoverDataWithGenres = await fetchDiscoverCarousel(
      listingParam,
      genreList,
    );

    setDiscoverData(newDiscoverDataWithGenres);
  };

  if (!marqueeData) {
    return null;
  }

  return (
    <>
      {marqueeData && <HeroCarousel marqueeData={marqueeData?.results} />}
      <ListingNavigation
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
        listings={discoverListings}
        onClick={onDiscoverListingButtonClick}
        activeListing={discoverListing}
      />
      {discoverGenre?.genres?.length ? (
        <GenreCarousel
          genres={discoverGenre?.genres}
          activeGenres={activeCarouselGenre}
          onClick={onGenreButtonClick}
          key={`genre-listing-${discoverListing}`}
        />
      ) : null}
      {discoverData?.results?.length ? (
        <Grid gridData={discoverData?.results.slice(0, 18)} />
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
