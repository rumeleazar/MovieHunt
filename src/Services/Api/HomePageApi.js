import { sendApiRequest } from './utils';

export const fetchHomePageData = async () => {
  const marqueeEndpoint = [`3/movie/now_playing`];

  const carouselUrlEndpoints = [
    `3/movie/top_rated`,
    `3/movie/popular`,
    `3/movie/upcoming`,
    `3/movie/now_playing`,
    `3/trending/all/day`,
    `3/trending/movie/day`,
    `3/trending/tv/day`
  ];
  const railTitle = ['Top Rated', 'Popular', 'Upcoming', 'Now Playing', 'movie','series'];

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
    const carouselData = data.slice(1);

    const newCarouselData = carouselData?.map((item, index) => {
      return { ...item, title: railTitle[index] };
    });

    return { marquee: marqueeData, carouselData: newCarouselData };
  } catch (error) {
    return [];
  }
};
