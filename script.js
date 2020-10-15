
$(document).ready(function () {
    //access local memory to get history arry
    let storedhistoryArr = JSON.parse(localStorage.getItem("history")) || [];
    //define history arry
    let historyArr = [];
    //if stored arry from local memory is empty not empty make it the historyarr
    if (storedhistoryArr !== null) {
        historyArr = storedhistoryArr
    }
    //empty the history container
    $(".history").empty();
    //populate the history container
    history(historyArr)
    //clear the history container and local storage
    $("#clear").click(function () {
        localStorage.clear();
        $(".history").empty();
        historyArr = [];
        console.log("clear")
    });
    //this is not working properly, to use button to display weather
    $(".historybtn").click(function () {
        console.log('click');
        var cityname = $(".historybtn").val()
        console.log(cityname);
    });

    //when the submit button is pressed
    $("#submit").click(function (e) {
        e.preventDefault()
        //save the value of the text box as city
        var city = $("#search").val();
        //if this is already in history arry dont add it
        if (historyArr.includes(city)) {
            historyArr = historyArr
        } else { //add to history arry and hitarr to local storage if this is a new search
            historyArr.push(city)
            localStorage.setItem("history", JSON.stringify(historyArr));
            $(".history").empty();
            history(historyArr, city)

        }
        console.log(historyArr)
        //call the weather function
        weather(city)
    });

    function weather(city) {
        //this is where we get the current date
        var date = new Date();
        var todayday = parseInt(date.getDate());
        var todaymonth = parseInt(date.getMonth());
        var todayyear = parseInt(date.getFullYear());
        //format information how we want it displayed
        var todaydate = (todaymonth + "/" + todayday + "/" + todayyear)

        //some information we need for our querry call
        const key1 = "084e3b84d90cf441e5966702a186274a"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key1
        var forcastqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key1
        //if the city search isnt an empty feild
        if (city != "") {
            //make an api call using ajax for todays weather
            $.ajax({
                url: queryURL,
                type: "GET",
                dataType: "jsonp",
                success: function (response) {
                    //create clear the weather container
                    $(".weatherbox").empty()
                    //create some html elements to house our info
                    var Todaydiv = $("<div>");
                    Todaydiv.addClass("card-div");
                    $(".weatherbox").append(Todaydiv);

                    var citydiv = $("<h1>").html(city);
                    var report = $("<section>");
                    Todaydiv.append(citydiv, report);

                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
                    img.addClass("img");
                    citydiv.append(img)
                    //write information into the created html elements
                    var datediv = $("<div>").html("DATE: " + todaydate);
                    var tempdiv = $("<div>").html("TEMPERATURE: " + response.main.temp + "F");
                    var humiddiv = $("<div>").html("HUMIDITY: "+ response.main.humidity + "%");
                    var winddiv = $("<div>").html("WIND SPEED: "+response.wind.speed + "MPH");
                    report.append(datediv, tempdiv, humiddiv, winddiv);

                    var rowcontainer = $("<section>");
                    rowcontainer.addClass("row")


                    //THIS is the call used for the 5 day forcast
                    $.ajax({
                        url: forcastqueryURL,
                        method: "GET"
                    }).then(function (forcast) {
                        //clear this feild 
                        $(".forcast").empty();
                        //create a var to make this easier to work with
                        var result = forcast.list;

                        //run thought all the posible ids
                        for (let i = 0; i < result.length; i++) {
                            //when the index value is 12
                            if (result[i].dt_txt.indexOf("12:00:00") !== -1) {
                                //convert temperatures to F
                                let temp = (result[i].main.temp - 273.15) * 1.80 + 32;
                                let tempFh = Math.floor(temp)
                                //build our cards
                                const card = $("<div>").addClass("card col-2");
                                const carddiv = $("<div>").addClass("")
                                const temperature = $("<p>").addClass("").text("Temperature: " + tempFh + " °F");
                                const humidity = $("<p>").addClass("").text("Humidity: " + result[i].main.humidity + "%");
                                //use the date we made before and incress the day by 1 per each card
                                //will need to fix this to account of end of month to new month
                                todayday++;
                                todaydate = (todaymonth + "/" + todayday + "/" + todayyear)
                                //append information onto the cards
                                const cityDate = $("<h4>").addClass("").text(todaydate);
                                carddiv.append(cityDate, temperature, humidity);
                                card.append(carddiv)
                                $(".forcast").append(card);

                            }
                        }
                    })
                }

            });
            //if no enty give error
            //also need to add error for bad request(entry not in the call)
        } else {
            console.log("no entry")
        };

    }
    //here we build buttons using the historyarr
    function history(historyArr, city) {

        for (let index = 0; index < historyArr.length; index++) {
            const historyitemdiv = $("<button>").addClass("col-12 historybtn").attr("value", city).html(historyArr[index]);
            $(".history").append(historyitemdiv);

        }

    }




});





