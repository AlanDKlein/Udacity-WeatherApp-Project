
/* Global Variables */
const weatherMapURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const weatherMapKey = '&appid=604bcb6a43f0ca651dd81bcfed73654f';
const units = '&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

let getWeather = () => {
    let myZip = document.getElementById("zip").value;
    const fullURL = `${weatherMapURL}${myZip}${units}${weatherMapKey}`;
    getWeatherData(fullURL);
 };


document.getElementById("generate").addEventListener('click', getWeather);

const getWeatherData = async (fullURL) => {
    const response = await fetch(fullURL);
    try {
        const data = await response.json();
        // console.log(data);
        
        const newStuff = {
            temperature: data.main.temp,
            date: newDate,
        };
        console.log("newStuff = ", newStuff);
        postData("/add", newStuff);
     //   return(data);
        } catch (error) {
        console.log("error = ", error);
    }
}

const postData = async (url = '', data = {}) => {
    console.log('data = ', data);
    console.log("url = ", url);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-type":"application.json",},
        body: JSON.stringify(data), 
    });


try {
    console.log("in postData try block");
     const newData = await response.json();
    console.log("new data = ", newData);
    return newData;
} catch (error) {
    console.log("error = ", error);
}
}
//postData("http://localhost:3000/add", data={});



// //Udate the UI
// const updateUI = async () => {
//     const request = await fetch('/all');
//     console.log('Update request =', request);
//     try {
//         const theData = await request.json();
//         document.getElementById('date').innerHTML = theData.date;
//         document.getElementById('temperature').innerHTML = theData.temperature;
//         document.getElementById('userIput').innerHTML = theData.userInput;
//     }
//     catch (erro) {
//         console.log(error);
//     }
// };

