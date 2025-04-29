export const sanitizeDescription = (description) =>
	description
		.replaceAll('&nbsp;', ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
		.replaceAll('<p>', '\n')
		.replaceAll('</p>', '')
		.replace(/<br\s*\/?>/g, '\n')
		.trim();
