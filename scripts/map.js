function initMap () {

  // The location of Humber
//  var humber = {
//        lat: 43.724330436 , 
//        lng: -79.605497578};
//    
    var humberAdd = "1143 Brooks Dr, Mississauga, ON L5E 1T4";
    var humberMap = new google.maps.Map(
      document.getElementById('map'), 
      {
        zoom: 16,
        mapTypeId: "hybrid"
      });
    var gcoder = new google.maps.Geocoder();
    
    //Param: GeocoderRequest, Callback
    gcoder.geocode (
        {
            address: humberAdd
        },
        function (results, status) 
        { 
            if (status == "OK") {
                //results[0].geometry.location results return an array
                humberMap.setCenter(results[0].geometry.location);
                humberMarker = new google.maps.Marker (
                    {
                        position: results[0].geometry.location, 
                        map: humberMap
                    }
                )
            }
        }
    );
  // The map, centered at Humber
  
//  // The marker, positioned at Uluru
//  var marker = new google.maps.Marker({position: humber, map: humberMap});
}
//Ajax Loading 
//function initMapAjax () {
//    var map = new google.maps.Map(
//        document.getElementById("map"),
//        {zoom: 14}
//    );
//    var gcoder = new google.maps.Geocoder();
//    //Ajax
//    var ajax;
//    try {
//        ajax = new XMLHttpRequest();
//    } catch (e) {
//        try {
//           ajax = new ActiveXObject("Msxml2.XMLHTTP");
//            }
//        catch (e) {
//            console.error("Go back");
//            return false;
//            }
//        }
//    ajax.open("POST", "test.php", true);
//    ajax.send();
//    ajax.onreadystatechange = function() {
//        if (ajax.readyState == 4) {
//            console.log(ajax.responseText);
//            var address = JSON.parse(ajax.responseText);
//            gcoder.geocode(
//                {
//                    address: address.address
//                },
//                function(results, status) {
//                    map.setCenter(results[0].geometry.location);
//                    var marker = new google.maps.Marker (
//                        {
//                            position: results[0].geometry.location,
//                            map: map
//                        }
//                    );
//                }
//            );
//        }
//    }
//}
//function initMapJQuery() {
//    var map = new google.maps.Map (
//        document.getElementById("map"), {zoom: 12}
//    );
//    var gcoder = new google.maps.Geocoder();
//    $.post("test.php", function(result) {
//        var addresss = JSON.parse(result);
//        gcoder.geocode(
//                {
//                    address: address.address
//                },
//                function(results, status) {
//                    map.setCenter(results[0].geometry.location);
//                    var marker = new google.maps.Marker (
//                        {
//                            position: results[0].geometry.location,
//                            map: map
//                        }
//                    );
//                }
//            );
//    });
//}
