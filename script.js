$(document).ready(function() { 
 
    // add Moment.js
    var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(currentDate);
    var tempF = function (x) {return(Math.floor(x - 273.15) * 1.80 + 32)};
    // to create the day element in html
    $("#currentDay").text(currentDate);
    
    var searchBtn = $("#searchButton");
    console.log(searchBtn);
    var citiesStorage = []

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

        // Transfer content to HTML

          $(".city").html("<h1>" + response.name + " Weather Details</h1>");
          $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
          $(".humidity").text("Humidity: " + response.main.humidity + " %");
          
          // add temp content to html
          $(".temp").text("Temperature (F) " + tempF(response.main.temp) + " ºF");

          // Log the data in the console as well
          console.log("Wind Speed: " + response.wind.speed +" MPH");
          console.log("Humidity: " + response.main.humidity + " %");
          console.log("Temperature (F): " + tempF(response.main.temp) + " ºF");   
        
            

        var citiesSaved=  $(".citiesSaved").addClass("cityList").prepend($("<li>").text(searchCitys));
        /* JSON.parse(citiesSaved) */
        citiesStorage.push(citiesSaved);
        localStorage.setItem("Cities Searched", JSON.stringify(citiesStorage));
/*         console.log(localStorage.getItem("Cities Searched")) 
        citiesSaved.append(localStorage.getItem("Cities Searched")); */
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
       // Here we run our AJAX call to the OpenWeatherMap API forecast
       $.ajax({
         url: queryURL,
         method: "GET"
       })       
         .then(function(response) {

        
           // Log the queryURL
           forecastArray=[]
          forecastArray[0]= response.list[3]
          forecastArray[1]= response.list[11]
          forecastArray[2]= response.list[19]
          forecastArray[3]= response.list[27]
          forecastArray[4]= response.list[35]
          console.log(forecastArray);


/*           $(".futureForecast").prepend($("<p>").text("Weather Five days Forecast: "));  */
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
    })