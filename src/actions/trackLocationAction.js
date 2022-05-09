import {BASE_URL} from "../utils/urls";


export function trackLocationSuccess(data) {
    return {
        type: 'TRACK_LOCATION_SUCCESS',
        data
    }
}
export function changeLang(data) {
    return {
        type: 'CHANGE_LANG',
        data
    }
}
export function trackSourceLocation(data) {
    return {
        type: 'SOURCE_LOCATION',
        data
    }
}
export function trackDestinationLocation(data) {
    return {
        type: 'DESTINATION_LOCATION',
        data
    }
}
export function trackLocationFailed(error) {
    return {
        type: 'TRACK_LOCATION_FAILED',
        error
    }
}
export function trackLocation(data, token) {
    console.log('trackLocation');

}
