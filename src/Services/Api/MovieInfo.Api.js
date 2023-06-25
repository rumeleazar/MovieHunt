import { sendApiRequest } from './utils';

export const fetchAssetInfo = async ({ mediatype, movieid }) => {
  const url = `3/${mediatype}/${movieid}`;

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

export const fetchAssetReviews = async ({ mediatype, movieid }) => {
  const url = `3/${mediatype}/${movieid}/reviews`;

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
