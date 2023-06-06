import { sendApiRequest } from './utils';

export const fetchHomePageData = async () => {
  const marqueeEndpoint = [`3/movie/now_playing`];

  const carouselUrlEndpoints = [`3/movie/popular`, `3/discover/movie`];
  try {
    const data = await Promise.all(
      [...marqueeEndpoint, ...carouselUrlEndpoints].map((url) =>
        sendApiRequest(url).then((response) => response),
      ),
    );

    if (!data) {
      return {};
    }

    const marqueeData = data[0];
    const carouselData = [data[1], data[2]];

    const newCarouselData = carouselData?.map((item, index) => {
      return { ...item };
    });

    return { marquee: marqueeData, carouselData: newCarouselData };
  } catch (error) {
    return [];
  }
};

export const fetchIndividualCarousel = async (listingParam) => {
  return await sendApiRequest(`3/movie/${listingParam}`);
};

export const fetchDiscoverCarousel = async (listingParam, genreList = []) => {
  const parsedGenreList = genreList.join();
  return await sendApiRequest(
    `3/discover/${listingParam}?with_genres=${parsedGenreList}`,
  );
};

export const fetchGenres = async () => {
  return await Promise.all([
    sendApiRequest(`3/genre/movie/list`),
    sendApiRequest(`3/genre/tv/list`),
  ]);
};
