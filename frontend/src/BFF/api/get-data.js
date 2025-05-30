export const getData = async (endpoint) => {
	try {
		const response = await fetch(`http://localhost:3005/${endpoint}`);
		if (!response.ok) {
			throw new Error(`Ошибка сервера: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		throw new Error(`Невозможно получить данные с сервера: ${error}`);
	}
};
