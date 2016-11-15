<?php
    function callSfApi($urlPath){
        $basUrl = 'https://mobilebackend.sfbio.se/services/5/';
        //$urlPath = 'shows/MA/theatreid/109/day/20161109';
        $url = $basUrl . $urlPath;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);

        $headers = [
        'X-SF-Iphone-Version: 5.5.0',
        'User-Agent: SFBio/5.3.0 (iPhone; iOS 9.2.1; Scale/2.00)',
        'Authorization: Basic U0ZiaW9BUEk6YlNGNVBGSGNSNFoz'
        ];
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($curl);

        $result = substr($result, 0, -1);
        echo $result;
        curl_close($curl);
        
    }

    if (isset($_GET['cityID'])) {
        $cityID = $_GET['cityID'];
        getCinemas($cityID);
    } elseif (isset($_GET['cities'])) {
        getCities();
    } elseif (isset($_GET['theatres'])) {
        getCities();
    } elseif (isset($_GET['cityID2']) && isset($_GET['theaterID'])) {
        $theaterID = $_GET['theaterID'];
        $cityID = $_GET['cityID2'];

        getMovies($cityID, $theaterID);
    }

    function getCities(){
        $urlPath = 'cities';
        callSfApi($urlPath);
    }

    function getCinemas($cityID){
        $urlPath = "theatres/$cityID";
        callSfApi($urlPath);
    }

    function getMovies($cityID, $theaterID){
        $urlPath = "shows/$cityID/theatreid/$theaterID/day/20161115";
        callSfApi($urlPath);
    }


?>