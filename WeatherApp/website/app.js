
/* Global Variables */
const weatherMapURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const weatherMapKey = '&appid=604bcb6a43f0ca651dd81bcfed73654f';
const units = '&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Check to make sure the user entered the zip and something in the feelings text area.  Then grab the zip code and feelings input and build the 'full' URL for the external API call to getWeatherData to get the temperature.

function getWeather() {
    let myZip = document.getElementById("zip").value;
    let feelings = document.getElementById('feelings').value;
    const fullURL = `${weatherMapURL}${myZip}${units}${weatherMapKey}`;
    if (myZip === 'null' || myZip === '' || feelings === 'null' || feelings === '') {
        alert("Please add both zip code and how you are feeling today.")
    } else {
        getWeatherData(fullURL)
            .then((data) => {
                const newStuff = {
                    temperature: data.main.temp,
                    date: newDate,
                    feelings: feelings,
                    city: data.name
                };
                postData("/add", newStuff)
                    .then(updateUI);
            });
    }
};


// Add an event listener to the generate button to listen for a click event.
document.getElementById("generate").addEventListener('click', getWeather);

// Call the external API with the full URL built previously.  The returned data is then used to build the object to send to the postData() function.  
const getWeatherData = async (fullURL) => {
    const response = await fetch(fullURL);
    try {
        const data = await response.json();
        return (data);
    } catch (error) {
        console.log("error = ", error);
    }
}

// Use the data returned from the external API call plus the user entered data to call the server POST route to post the data.  The data object is built in the .then() following the getWeatherData() call.
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),  // body: JSON/stringify(data), <-- USE A DOT (.), NO BACKSLASH!! BACKSLASH WILL CAUSE THE DATA TO NOT BE SENT!!!
        
    });

    try {
        const newData = await response.json();
        // return newData;
    } catch (error) {
        console.log("error = ", error);
    }
};

// //Udate the UI - Call the GET route on the server and then display the results in the browser.  This function is called from the .then() following the postData() call.  
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const theData = await request.json();
        document.getElementById('date').innerHTML =
            `Today's date is ${theData.date}.`;
        document.getElementById('temp').innerHTML = `The current temperature in ${theData.city} is ${theData.temp} fahrenheit.`;
        document.getElementById('content').innerHTML = `You are feeling ${theData.feelings} today.`;
    }
    catch (error) {
        console.log(error);
    }
};

