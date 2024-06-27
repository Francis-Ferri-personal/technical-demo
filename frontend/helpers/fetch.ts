
// @ts-ignore
const baseURL = process.env.BACKEND_API_URL;

const fetchRequest = (endpoint, url_params, method = "GET") => {
	const url = `${baseURL}/${endpoint}/${url_params}`;

	return fetch(url, {
		method,
		headers: {
			"Content-type": "application/json"
		},
	});
};

export { fetchRequest};