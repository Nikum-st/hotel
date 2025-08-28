const sanitizeDescription = (description) =>
	description
		.replaceAll('&nbsp;', ' ')
		.replace(/<\/?(div|p|br)[^>]*>/g, '')
		.trim();

module.exports = sanitizeDescription;
