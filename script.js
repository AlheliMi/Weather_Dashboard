$(document).ready(function() { 
    var varCities =0
    //localStorage.clear()
    // add Moment.js
    var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(currentDate);
    var tempF = function (x) {return(Math.floor(x - 273.15) * 1.80 + 32)};
    // to create the day element in html
    $("#currentDay").text(currentDate);
    
    var searchBtn = $("#searchButton");
    console.log(searchBtn);


    searchBtn.on("click",function (event) {
      event.preventDefault();
       
    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
 // To grab the city search
      var searchCitys = $("#searchInput").val();
      console.log(searchCitys);
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + searchCitys + "&appid=" + APIKey;
      console.log(queryURL)
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML, THE ICON for the current day, does not work
          /* $(".imgIcon").attr("src","http://openweathermap.org/img/w/" + response.weather.icon + "png"); */
          $(".city").html("<h2>" + response.name + " Weather Details</h1>");
          $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
          $(".humidity").text("Humidity: " + response.main.humidity + " %");
          $(".temp").text("Temperature " + tempF(response.main.temp) + " ºF");

          // Log the data in the console as well
          console.log("Wind Speed: " + response.wind.speed +" MPH");
          console.log("Humidity: " + response.main.humidity + " %");
          console.log("Temperature (F): " + tempF(response.main.temp) + " ºF");   

          // http://api.openweathermap.org/data/2.5/uvi?lat=
          var queryURL = "http://api.openweathermap.org/data/2.5/uvi?" +"lat="+ response.coord.lat + "&lon="+ response.coord.lon + "&appid=" + APIKey;
          $.ajax({
           url: queryURL,
           method: "GET"
          })
           .then(function(response){
              $(".current-uv").text("UV Index: " + response.value);
          var indexUV = response.value
      
                     
if (indexUV >=0 && indexUV <=3.0) {
  $(".current-uv").removeClass("yellow orange red purple").addClass("green").text("UV Index: " + response.value + " LOW you can wear your bikini with no problems")
  }
  else if (indexUV >=3.0 && indexUV <=5.0) {
    $(".current-uv").removeClass("green orange red purple").addClass("yellow").text("UV Index: " + response.value + " MODERRATE use little sunscreen")
  }
  else if (indexUV >=6.0 && indexUV<=7.0) {
    $(".current-uv").removeClass("green yellow red purple").addClass("orange").text("UV Index: " + response.value + " HIGH use a lot of sunscrreen")
  } 
  else if(indexUV >=8.0 && indexUV <=10.0) {
    $(".current-uv").removeClass("green yellow orange purple").addClass("red").text("UV Index: " + response.value + " VERY HIGH you better get an armour")
  }
  else if(indexUV >=11.0) {
    $(".current-uv").removeClass("green yellow orange red").addClass("purple").text("UV Index: " + response.value + " EXTREME you are going to toast") 
  }
           });

/*            $(".citiesSaved").addClass("cityList").prepend($("<li>").text(searchCitys)) */

      var buttonCitiesList = $(".citiesSaved").addClass("cityList myButton").prepend($("<button>").addClass("cityList myButton").text(searchCitys));
       
      console.log(searchCitys);
        /* JSON.parse(citiesSaved) */
        varCities++
        localStorage.setItem("Cities Searched " + varCities, (searchCitys));
        console.log(localStorage.getItem("Cities Searched " + varCities)) 
       // var citiesList = JSON.parse(localStorage.getItem(searchCitys))
        //citiesList.append(localStorage.getItem("Cities Searched")); 
      });
    

    // This is our API key for five days forescast
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    // To grab the city search
    var searchCitys = $("#searchInput").val();
    console.log(searchCitys);
    // Here we are building the URL we need to query the database
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + searchCitys + "&appid=" + APIKey;
    console.log(queryURL)
       // Run our AJAX call to the OpenWeatherMap API forecast
       $.ajax({
         url: queryURL,
         method: "GET"
       })       
         .then(function(response) {
           forecastArray=[]
          forecastArray[0]= response.list[3]
          forecastArray[1]= response.list[11]
          forecastArray[2]= response.list[19]
          forecastArray[3]= response.list[27]
          forecastArray[4]= response.list[35]
          console.log(forecastArray);

           
           $("#FF").addClass("forecast").text("Weather Five days Forecast: "); 
            $(".forecastCards").html("");
            for(i=0; i<forecastArray.length; i++){
                var card = $("<div>").addClass("card")
                card.append(
                    $("<div>").addClass("card-divider").append(
                        $("<h5>").text(forecastArray[i].dt_txt.substring(0 , 10))
                    )
                )
                .append(
                    $("<div>").addClass("card-section").append(
                        $("<img>").attr("src","http://openweathermap.org/img/w/" + forecastArray[i].weather[0].icon + ".png")
                    ).append(
                        $("<p>").text("Temp: " + tempF(forecastArray[i].main.temp) +" ºF")
                    )
                    .append(
                        $("<p>").text("Humidity: " + forecastArray[i].main.humidity +" %")
                    )
                    .append(
                      $("<p>").text("Wind: " + forecastArray[i].wind.speed + " MPH")                        
                    )
                )
                $(".forecastCards").append(card);
            }

        })

      });


      // this should work to turn the button to link the city to the weather but i couldn´t make it work
/*       $(".cityList").on(click(function(){
        var buttonText = $(this).text();
        console.log(buttonText);
        response.buttonCitiesList
      })); */
     
    })