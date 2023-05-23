const DEFAULT_LANGUAGE = 'en_US';
const API_BASE_URL = 'https://api.themoviedb.org';

export const sendApiRequest = (urlParams, method = 'GET', header) => {
	const token = process.env.REACT_APP_API;

	let urlWithToken;

	if (urlParams.includes('?')) {
		urlWithToken = `${API_BASE_URL}/${urlParams}&api_key=${token}&languange=${DEFAULT_LANGUAGE}`;
	} else {
		urlWithToken = `${API_BASE_URL}/${urlParams}?api_key=${token}&languange=${DEFAULT_LANGUAGE}`;
	}

	return fetch(urlWithToken)
		.then((response) => response.json())
		.catch((error) => {
			return Promise.reject(error);
		});
};
