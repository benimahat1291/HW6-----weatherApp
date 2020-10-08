


$(document).ready(function(){
    
    var historyArr = [];

   

    $("#submit").click(function (e){
        e.preventDefault()
        const key = "166a433c57516f51dfab1f7edaed8413"
        const key1 = "084e3b84d90cf441e5966702a186274a"
        const key2 = "e5a5d4ba5ab1d31ad291b42947d0606b"

        var city = $("#search").val();
        console.log(city);

        history(city,historyArr);



      $(".weatherbox").empty()
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key1

        if(city != ""){
            $.ajax({
                url: queryURL,
                type: "GET",
                dataType: "jsonp",
                success: function(response){
                    console.log(response);

                    var Todaydiv = $("<div>");
                    Todaydiv.addClass("card-div");
                    $(".weatherbox").append(Todaydiv);

                    var citydiv = $("<h1>").html(city);
                    var report = $("<section>");
                    Todaydiv.append(citydiv,report);

                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
                    img.addClass("img");
                    citydiv.append(img)

                    var tempdiv = $("<div>").html(response.main.temp);
                    var humiddiv = $("<div>").html(response.main.humidity);
                    var winddiv = $("<div>").html(response.wind.speed);
                    report.append(tempdiv,humiddiv,winddiv);

                    var rowcontainer = $("<section>");
                    rowcontainer.addClass("row")




                }

            });
        }else{
            console.log("no entry")
        };
    });


});



function history(city,historyArr){
    historyArr.push(city);
    console.log(historyArr);
    localStorage.setItem("history", JSON.stringify(historyArr));
    
}











// function currentWeather(city, key) {

  
 
//     console.log(queryURL)
//     console.log(city);
//     $.ajax({
//         url: queryURL,
//         type: "GET",
//         dataType: "jsonp",
//         success: function (response) {
//             console.log(response);
//             console.log(response.name)
//             console.log(response.main.temp)
//             console.log(response.weather[0].main)


//         }
//     });

// };


// $("#submit").click(function (e) {
//     e.preventDefault();
//     city = $("#search").val();
//     $(".weatherbox").empty();
//     currentWeather();
// });


