export const handleOpenList = async (
	listIsOpen,
	setListIsOpen,
	setLoadingList,
	setData,
	ref,
	url,
) => {
	const isOpening = !listIsOpen;
	setListIsOpen(isOpening);

	if (!isOpening) return;

	try {
		setLoadingList(true);
		const response = await fetch(url);
		const result = await response.json();
		if (result.error) {
			console.error(result.error);
			return;
		}
		setData(result.data);
	} catch ({ message }) {
		console.error(message || 'Error server');
	} finally {
		setLoadingList(false);
		setTimeout(() => {
			ref.current?.scrollIntoView({ behavior: 'smooth' });
		}, 100);
	}
};
