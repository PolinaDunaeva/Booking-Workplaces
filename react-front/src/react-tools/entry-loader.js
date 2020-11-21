const reactPlaceholder = document.getElementById('react');

if (reactPlaceholder) {
	// eslint-disable-next-line no-restricted-properties
	require.ensure([], require => {
		const loader = require('./react-entry.jsx');

		loader.default(reactPlaceholder);
	});
}
