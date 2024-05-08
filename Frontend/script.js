//Initializing the map
var map = L.map('map')
map.setView([51.505, -0.09], 13); //It cointains the longitude ,latitude and zoom level.

//We import leaflet data as variable L; It extracts map data from open streetmap's server.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);  //addTo method to add data to map variable

//Now to select user's current location dynamically

navigator.geolocation.watchPosition(success,error); //It takes two functions as its parameter

//Initializing the marker, circle and zoom-level gloabally
let marker,circle,zoomed;

function success(pos){

    //Now we're extracting current info of the user
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    //to check if there's one marker or not
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    //creating marker
    marker=L.marker([lat,lng]).addTo(map);
    circle = L.circle([lat,lng],{radius: accuracy}).addTo(map);

    //we have to update the setView method of the map everytime user update his location

    if (!zoomed) {
       zoomed =  map.fitBounds(circle.getBounds());
    }   //To make zoom-level fixed when user changes his location

    map.setView([lat,lng]);


}
//There's a possibility that the user is denying his/her location so to handle this error

function error(err){
    if (err.code == 1) {
        alert("Please allow geolocation access");
    }else{
        alert('Cannot get current location')
    }
}