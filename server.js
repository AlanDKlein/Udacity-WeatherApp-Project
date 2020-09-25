// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
    function listening() {
        console.log(`server is running on localhost:  ${port}`);
    };

//GET Route
app.get('/all', sendData);
function sendData(req, res) {
    // res.send(projectData);
    res.send("My new Get route IS working");
}

//POST Route
app.post('/add', (req, res) => {

  
console.log('body = ', req.body)
    projectData = {
        
       temp: req.body.temperature,
       date: req.body.date,
        // // userInput: req.body.userInput,
        // userInput: 'test',
    };
    console.log(projectData);
    res.send(projectData);
    // projectData.push(weatherData);
 
})