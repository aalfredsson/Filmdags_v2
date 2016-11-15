$(document).ready(function(){
    
    
    //when a city is choosen it gets the chosen citys cinemas
    $( "#cities" ).change(function() {
        var cityId = $("#cities").val()

        $.ajax({
            url: 'filmjq.php',
            data: {cityID: cityId},
            complete: function(data){
                console.log(data.responseText);
                placetheatres(data.responseText);
            },
            error: function(err){
                console.log(err);
            }
        });

    });
    
    //when the specific theatre of the specifik city is chosen the movies that is played on that theater 
    $( "#theatres" ).change(function() {
        var cityId = $("#cities").val()
        var theatresId = $("#theatres").val()
        console.log(cityId + theatresId);
        $.ajax({
            url: 'filmjq.php',
            data: {cityID2: cityId, theaterID: theatresId},//ändra cityID2
            complete: function(data){
                getMovies(data.responseText);
            },
            error: function(err){
                console.log(err);
            }
        });

    });
    
    
    //makes an ajaxcall to the php when a user enters the site
    //gets a list of all the citys and corresponding ID
    function callPhp(){

        
        $.ajax({
            url: 'filmjq.php',
            data: {cities: "cities"},
            complete: function(data){
                console.log(data);
                placeCities(data.responseText)
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    
    //places the list of cities in a select list
    function placeCities(cities){
        console.log(cities);
        var cityArray = JSON.parse(cities);
        
        for (i = 0; i < cityArray['cities'].length; i++){
            $("#cities").append($('<option>', {
                value: cityArray['cities'][i]['id'],
                text: cityArray['cities'][i]['name']
            }));
        
        }
        

    }
    
    //movies of specifik theater
    function getMovies(movies){

        var movieArray = JSON.parse(movies);
        console.log(movieArray);
        /*for (i = 0; i < movieArray['shows'].length; i++){
            $("#cities").append($('<option>', {
                value: cityArray['cities'][i]['id'],
                text: cityArray['cities'][i]['name']
            }));
        
        }*/
        

    }
    
    //places the theaters in a select list
    function placetheatres(theatres){
        var theatresArray = JSON.parse(theatres);

        for (i = 0; i < theatresArray['theatres'].length; i++){
            $("#theatres").append($('<option>', {
                value: theatresArray['theatres'][i]['id'],
                text: theatresArray['theatres'][i]['name']
            }));

        }
    }
        

    
    //ska kallas på i ajax anropet

    callPhp()
    
    var counter = 10;
    
    //för varje counter, skapa en div med klassen filmruta
    function createMoviebox(){
        for (i=0; counter>i; i++){
            $("<div></div>").addClass("filmruta").appendTo(".article");
            
            var css = 16; //räknar bort margin etc.
            var winwid = $(window).width() - css;
            var rutawid = $(".filmruta").width();
            radwid = Math.floor(winwid / rutawid); //räknar hur många filmrutor som får plats på en rad där en rad är lika bred som fönstret
            
        }
        putBoxInRow(radwid);
    }
    
    //lägger alla filmrutor i en array, kollar hur många filmrutor som får plats i en rad(en rads längd= window.length) och delar arrayen där och lägger de filmrutorna i en rad och resten i en ny rad etc.
    function putBoxInRow(radwid){
        var movieRow = $(".filmruta");
        console.log(movieRow);
        for (var i=0; i < movieRow.length; i+=radwid){
            movieRow.slice(i, i+radwid).wrapAll('<div class="filmrad"></div>');
        }
    }

    //loopa varje filmruta som finns, lägg in en div med klassen content och en bild
    
    function movieBoxContent(){
        $(".filmruta").each(function(index, value){

            $("<div></div>").addClass("content").appendTo(value);

            $(value).prepend('<img src="Thor.jpg" alt="">'); 

        });

        //i varje div content, lägg till tre p taggar med tillhörande klasser
        $(".content").each(function(index, value){

            $("<p></p>").addClass("tid").appendTo(value).append("18.00");
            $("<p></p>").addClass("ledigap").appendTo(value).append("18/200");
            $("<p></p>").addClass("boka").appendTo(value).append("Boka");

        });
    }
    
    createMoviebox();
    movieBoxContent();
});
























/*
    function callSf(){
        url = 'https://mobilebackend.sfbio.se/services/5/';
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url + 'shows/MA/movieid/10016033/day/20161109',
            xhrFields: { withCredentials: true },

            headers: {
            'X-SF-Iphone-Version': '5.5.0',
            //'User-Agent': 'SFBio/5.3.0 (iPhone; iOS 9.2.1; Scale/2.00)',  --- ändra i konsolen
            //JSONP callback, eller hämta skiten i PHP och skicka till denna sida
            'Authorization': 'Basic U0ZiaW9BUEk6YlNGNVBGSGNSNFoz',
            'Access-Control-Allow-Origin': '*'
            },//kolla jsonpcallback

            
            
            
            success:function(data, status){
                console.log(data);
            },
            
            error:function(err, status){
                console.log(err);
            }
        });
    }
    */