module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{tsx,ts,ttf,css,png}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};