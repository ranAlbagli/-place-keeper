'use strict'

var gPlaces=[];
var gId=1;
 


function deletePlace(placeId) {
    var foundPlaceIdx = gPlaces.findIndex(function (place) {
        return place.id === placeId
    })
    gPlaces.splice(foundPlaceIdx, 1)
}

function savePlaces(){
    saveToStorage('places',gPlaces)
}


function getPlace(id) {
    var foundPlace = gPlaces.find(function (place) {
        return id === place.id;
    })
    return foundPlace;
}