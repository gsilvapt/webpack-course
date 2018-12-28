const path = require('path');
const express = require('express');

const app = express();

// To add more features to this server, we could define routes **above** the lines
// below.
// This includes adding routes for databases and other associated services to
// this web application.
// The crucial part is to define below the if statement below so that express
// renders the correct parts of the website as we define and order is important.

if (process.env.NODE_ENV !== 'production') {
	// Only in the case we are not in production, we call these.
	const webpackMiddleware = require('webpack-dev-middleware');
	const webpack = require('webpack');
	const webpackConfig = require('./webpack.config.js');

	app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
	// When we are in production, we thus render the dist files.
	app.use(express.static('dist')); // Searches for the static files in this dir
	// This works correctly for react-router due to browser history compatibility.
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}


app.listen(process.env.PORT || 3050, () => console.log('Listening.'));
