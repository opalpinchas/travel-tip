import { mapService } from './map.service.js'
import { storageService } from './storage.service.js'



export const locService = {
    getLocs,
    saveLoc
}


let locs = storageService.load('locs') || []

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function saveLoc(){
    const pos =     mapService.getCurrLoc()
    const loc = {
        name: 'new',
        lat: pos.lat,
        lng: pos.lng
    }

    locs.push(loc)
   storageService.save('locs', locs)
}


