import { sendApiRequest } from './utils';

export const fetchHomePageData = async () => {
  const marqueeEndpoint = [`3/movie/now_playing`];

  const carouselUrlEndpoints = [
    `3/movie/top_rated`,
    `3/movie/popular`,
    `3/movie/upcoming`,
  ];
  const railTitle = ['TOP RATED', 'POPULAR', 'UPCOMING'];
  await Promise.all(
    [...marqueeEndpoint, ...carouselUrlEndpoints].map((url) =>
      sendApiRequest(url).then((response) => response),
    ),
  )
    .then((data) => {
      const marqueeData = data[0];
      data.shift();

      const newCarouselData = data.map((item, index) => {
        return { ...item, title: railTitle[index] };
      });
      return { marquee: marqueeData, carouselData: newCarouselData };
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
