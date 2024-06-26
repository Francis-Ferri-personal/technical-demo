

const baseURL = process.env.REACT_APP_BACKEND_URL;

const fetchRequest = (endpoint: string, method = "GET") => {
	const url = `${baseURL}/${endpoint}`;

	return fetch(url, {
		method,
		headers: {
			"Content-type": "application/json"
		},
	});
};

export { fetchRequest };