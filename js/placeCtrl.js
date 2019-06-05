'use strict'

var map;
var gPlaces = []


// Initialize and add the map
function initMap() {
    if (loadFromStorage('places'))
        gPlaces = loadFromStorage('places')
    if (gPlaces) renderPlaces();
    // The location of Uluru
    var uluru = { lat: 29.55805, lng: 34.94821 };
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 7, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
    map.addListener('click', function (e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
}


function getUserCords() {
    var infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            var marker = new google.maps.Marker({ position: pos, map: map });
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);

    gPlaces.push({ id: gId++, lng: marker.position.lng(), lat: marker.position.lat(), name: prompt('name') })
    savePlaces();
    renderPlaces();
}



function renderPlaces() {
    var strHtml = '';
    for (var i = 0; i < gPlaces.length; i++) {
        strHtml += `<li> 
             ${gPlaces[i].name} 
             <div>
            <button class="show-btn btn" onclick="onShowLocation(${gPlaces[i].id})">🚩</button>
            <button class="delete-btn btn" onclick="onDeletePlaces(${gPlaces[i].id})">✘</button>
            </div>
            </li>`
    }
    document.querySelector('.board').innerHTML = strHtml
}

function onDeletePlaces(id) {
    deletePlace(id)
    renderPlaces();
    savePlaces()
}

function onShowLocation(id) {
    var place = getPlace(id)
    var pos = {
        lat: place.lat,
        lng: place.lng
    };
    new google.maps.Marker({ position: pos, map: map });
    map.setCenter(pos);
}



