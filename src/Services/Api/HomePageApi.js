import { sendApiRequest } from './utils';

export const fetchHomePageData = async () => {
  const marqueeEndpoint = [`3/movie/now_playing`];

  const carouselUrlEndpoints = [
    `3/movie/popular`,
    `3/trending/all/day`,
  ];
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
    const carouselData = [data[1],data[2]]

    const newCarouselData = carouselData?.map((item, index) => {
      return { ...item };
    });

    return { marquee: marqueeData, carouselData: newCarouselData };
  } catch (error) {
    return [];
  }
};

export const fetchIndividualCarousel = async (listingParam) => {
  return await sendApiRequest(`3/movie/${listingParam}`)
}

export const fetchDiscoverCarousel = async (listingParam) => {
  return await sendApiRequest(`3/trending/${listingParam}/day`)
}

export const fetchGenres = async (contentType) => {
  return await sendApiRequest(`3/genre/${contentType}}/list`)
}
 