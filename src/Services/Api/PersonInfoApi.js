import { sendApiRequest } from './utils';

export const fetchPersonInfo = async ({ peopleid }) => {
  const url = `3/person/${peopleid}`;

  try {
    const data = await sendApiRequest(url);

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMovieCredits = async ({ peopleid }) => {
  const url = `3/person/${peopleid}/movie_credits`;

  try {
    const data = await sendApiRequest(url);

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
