module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'xo',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
	},
	overrides: [
		{
			files: [
				'**/*.test.js',
			],
			env: {
				jest: true,
			},
		},
	],
};
