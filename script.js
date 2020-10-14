


$(document).ready(function () {


    let storedhistoryArr = JSON.parse(localStorage.getItem("history")) || [];
    let historyArr = [];

    if (storedhistoryArr !== null) {
        historyArr = storedhistoryArr
    }

    $(".history").empty();
     history(historyArr)
     console.log(historyArr)

    $("#clear").click(function () {
        localStorage.clear();
        $(".history").empty();
        historyArr = [];
        console.log("clear")

    });
   


    $("#submit").click(function (e) {
        e.preventDefault()
        var city = $("#search").val();


        if(historyArr.includes(city)){
                historyArr = historyArr
            }else{
                historyArr.push(city)
                localStorage.setItem("history", JSON.stringify(historyArr));
                $(".history").empty();
                history(historyArr)

            }
                console.log(historyArr)
        weather(city)  
    });

    function weather(city) {

        var date = new Date();
        var todayday = parseInt(date.getDate());
        var todaymonth = parseInt(date.getMonth());
        var todayyear = parseInt(date.getFullYear());
        var todaydate = (todaymonth + "/" + todayday + "/" + todayyear)
        const key1 = "084e3b84d90cf441e5966702a186274a"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key1
        var forcastqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key1
        if (city != "") {

          
            $.ajax({
                url: queryURL,
                type: "GET",
                dataType: "jsonp",
                success: function (response) {
                    $(".weatherbox").empty()

                    var Todaydiv = $("<div>");
                    Todaydiv.addClass("card-div");
                    $(".weatherbox").append(Todaydiv);

                    var citydiv = $("<h1>").html(city);
                    var report = $("<section>");
                    Todaydiv.append(citydiv, report);

                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
                    img.addClass("img");
                    citydiv.append(img)

                    var datediv = $("<div>").html(todaydate);
                    var tempdiv = $("<div>").html(response.main.temp);
                    var humiddiv = $("<div>").html(response.main.humidity);
                    var winddiv = $("<div>").html(response.wind.speed);
                    report.append(datediv, tempdiv, humiddiv, winddiv);

                    var rowcontainer = $("<section>");
                    rowcontainer.addClass("row")



                    $.ajax({
                        url: forcastqueryURL,
                        method: "GET"
                    }).then(function (forcast) {
                        $(".forcast").empty();

                        var result = forcast.list;


                        for (let i = 0; i < result.length; i++) {
                            let day = Number(result[i].dt_txt.split('-')[2].split(' ')[0]);
                            let hour = result[i].dt_txt.split('-')[2].split(' ')[1];


                            if (result[i].dt_txt.indexOf("12:00:00") !== -1) {
                                let temp = (result[i].main.temp - 273.15) * 1.80 + 32;
                                let tempF = Math.floor(temp)

                                const card = $("<div>").addClass("card col-2");
                                const cardBody = $("<div>").addClass("")
                                const temperature = $("<p>").addClass("").text("Temperature: " + tempF + " °F");
                                const humidity = $("<p>").addClass("").text("Humidity: " + result[i].main.humidity + "%");
                                todayday++;
                                todaydate = (todaymonth + "/" + todayday + "/" + todayyear)
                                const cityDate = $("<h4>").addClass("").text(todaydate);
                                cardBody.append(cityDate, temperature, humidity);
                                card.append(cardBody)
                                $(".forcast").append(card);

                            }
                        }
                    })
                }

            });
        } else {
            console.log("no entry")
        };

    }

    function history(historyArr) {
        for (let index = 0; index < historyArr.length; index++) {
            const historyitemdiv = $("<button>").addClass("col-12").html(historyArr[index]);
            $(".history").append(historyitemdiv);
        }


    }

});





