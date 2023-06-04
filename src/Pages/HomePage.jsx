import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Services/Store/store';
import Carousel from '../components/HomePage/Carousel/Carousel';
import HeroCarousel from '../components/HomePage/Hero/Hero';
import Grid from '../components/Grid/Grid';
import ListingNavigation from '../components/HomePage/ListingNavigation/ListingNavigation.';
import {
  fetchHomePageData,
  fetchIndividualCarousel,
  fetchDiscoverCarousel,
} from '../Services/Api/HomePageApi';
import { setLoadingIndicatorVisibility } from '../components/Loader/Loader';

const listings = ['Popular', 'Now Playing', 'Top Rated', 'Upcoming'];

const listingMapper = {
  trending: 'all',
  movies: 'movie',
  series: 'tv',
};

const discoverListings = ['Trending', 'Movies', 'Series'];

const HomePage = () => {
  const [marqueeData, setMarqueeData] = useState([]);
  const [individualCarousel, setIndividualCarousel] = useState([]);
  const [discoverData, setDiscoverData] = useState([]);
  const [activeListing, setActiveListing] = useState(0);
  const [discoverListing, setDiscoverListing] = useState(0);
  const { storeData, setStoreData } = useContext(StoreContext);

  useEffect(() => {
    fetchHomePageData()
      .then((data) => {
        console.log(data);
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
      const newData = await fetchIndividualCarousel(listingParam);
      setStoreData({
        homePage: {
          ...storeData.homePage,
          [listingParam]: newData,
        },
      });
      setIndividualCarousel(newData);
    } else {
      setIndividualCarousel(storeData.homePage[listingParam]);
    }
    setActiveListing(index);
  };

  const onDiscoverListingButtonClick = async (listingName, index) => {
    const listingParam = listingName.toLowerCase().replaceAll(' ', '_');
    if (!storeData.homePage[listingParam]) {
      const newData = await fetchDiscoverCarousel(listingMapper[listingParam]);
      setStoreData({
        homePage: {
          ...storeData.homePage,
          [listingParam]: newData,
        },
      });
      setDiscoverData(newData);
    } else {
      setDiscoverData(storeData.homePage[listingParam]);
    }

    setDiscoverListing(index);
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
      <br />
      <br />
      <br />
      <ListingNavigation
        listings={discoverListings}
        onClick={onDiscoverListingButtonClick}
        activeListing={discoverListing}
      />
      {discoverData?.results?.length ? (
        <Grid
          gridData={discoverData?.results.slice(0, 18)}
          keyName={discoverData?.title}
          key={discoverData?.title}
        />
      ) : null}
    </>
  );
};

export default HomePage;
