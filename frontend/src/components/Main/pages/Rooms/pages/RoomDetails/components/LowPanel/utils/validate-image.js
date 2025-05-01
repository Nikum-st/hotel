export const validateImage = (file) => {
	if (!(file instanceof File)) {
		return;
	}

	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			if (img.width !== 1024 || img.height !== 1024) {
				reject('The image must be 1024x1024 pixels');
			} else {
				resolve();
			}
		};
		img.onerror = () => reject('Invalid image');
		img.src = URL.createObjectURL(file);
	});
};
