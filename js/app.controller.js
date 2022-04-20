import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSaveLoc = onSaveLoc

function onInit() {
    mapService.initMap()
        .then(() => {
            initMap()
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(l) {
    mapService.addMarker();
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function initMap() {

    const map = mapService.getMap()
    map.addListener("click", (mapsMouseEvent) => {
     let infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      })
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      )
      infoWindow.open(map)
      mapService.updateCurrLoc(mapsMouseEvent.latLng.toJSON())
    })

  }


  function onSaveLoc(){
      locService.saveLoc()
  }
