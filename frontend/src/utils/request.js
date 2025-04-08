export const request = async (url, method, data) => {
	try {
		const response = await fetch(url, {
			method: method || 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: data ? JSON.stringify(data) : undefined,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = response.json();

		return result;
	} catch (e) {
		throw new Error(e);
	}
};
