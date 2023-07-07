// Dependeciens for express.
const express = require('express');

// Dependencies for the routed js files.
const api_routes = require('./routes/api-routes');
const html_routes = require('./routes/html-routes');

//
const app = express();

const PORT = 3001;

// Basic middleware for the use of json files/code and regular text.
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Custom middleware to use static public folder to load and also for the 
// custom routes.
app.use(express.static('public'));
app.use('/api', api_routes);
app.use('/', html_routes);

// PORT Listener
app.listen(PORT, () => {
    console.log(`API server ready to work at port http://localhost:${PORT}/`);
})

