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

		const result = await response.json();

		if (result.error) {
			console.error(result.error);
		}

		return result.data;
	} catch (e) {
		throw new Error('Error from server.  Please try again later');
	}
};
