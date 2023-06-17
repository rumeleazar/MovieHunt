import {
  fetchIndividualCarousel,
  fetchDiscoverCarousel,
} from '../Api/HomePageApi';

const listingMapper = {
  movies: 'movie',
  series: 'tv',
};
const discoverListings = ['Movies', 'Series'];

export const onListingButtonClick = async ({
  storeData,
  setStoreData,
  setIndividualCarousel,
  setActiveListing,
  listingName,
  index,
}) => {
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

export const onDiscoverListingButtonClick = async ({
  setActiveCarouselGenre,
  setDiscoverGenre,
  setDiscoverData,
  setDiscoverListing,
  genreRef,
  storeData,
  setStoreData,
  listingName,
  index,
}) => {
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

export const onGenreButtonClick = async ({
  activeCarouselGenre,
  discoverListing,
  setActiveCarouselGenre,
  setDiscoverData,
  genreId,
}) => {
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
