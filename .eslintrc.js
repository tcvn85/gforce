module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
		'prettier',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: [2, 'tab'],
		'no-tabs': 0,
		'func-names': 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	plugins: ['prettier'],
};
