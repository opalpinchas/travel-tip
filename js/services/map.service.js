

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    updateCurrLoc,
    getCurrLoc
}

var gMap
var gCurrLoc

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
}

function addMarker() {
    var marker = new google.maps.Marker({
        position: gCurrLoc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAeKOoG_NQYUlxuW1lvGe3uzKwZyQPR3Ow'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function getMap() {
    return gMap
}

function updateCurrLoc(loc){
    gCurrLoc = loc
    console.log(gCurrLoc)
}

function getCurrLoc(){
    return gCurrLoc
}

