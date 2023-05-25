import { sendApiRequest } from './utils';

export const fetchMovieSearchData = async (search) => {
  const url = `3/search/movie?query=${search}`;

  try {
    const data = await sendApiRequest(url);

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
};
