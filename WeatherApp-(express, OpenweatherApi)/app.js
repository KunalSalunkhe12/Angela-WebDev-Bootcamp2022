const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");



const app = express();

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

let temp = undefined;
let weatherDescription = undefined;
let weatherUrl = undefined;

app.get("/" , (req , res)=>{

  res.render('index' , {temp: temp , weatherDescription: weatherDescription});

});

app.post("/", (req,res)=>{

  let query = req.body.cityName;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=7c9f793334e3f266caa6b5d787378022&units=Metrics";
  https.get(url , (response)=>{
    console.log(response.statusCode);

    response.on("data", (data)=>{
      console.log(JSON.parse(data));
      const weatherData = JSON.parse(data);

      temp = weatherData.main.temp;
      weatherDescription = weatherData.weather[0].description;
      let weatherIcon = weatherData.weather[0].icon;
      weatherUrl = "http://openweathermap.org/img/wn/"+ weatherIcon + "@2x.png"

      res.render('index' , {temp: temp , weatherDescription: weatherDescription, weatherUrl: weatherUrl});
      res.redirect('/')
      // if(units == "Metric" ){
      //     res.write("<h1>The temperature in "+ query + " is: " + temp + " Degrees celcius.</h1>")
      // }else{
      //     res.write("<h1>The temperature in "+ query + " is: " + temp + " Fahrenheit.</h1>")
      // }

      // res.write("<p> Weather Description: " + weatherDescription + "</p>")
      // res.write("<img src=" + weatherUrl + ">");
     
    })
  })
})



app.listen(3000, ()=>{
  console.log("Server has started at port 3000")
})
