import {BASE_URL} from "../utils/urls";


export const getTabIndex = data => {
    return {
        type: "GET_TAB_INDEX",
        payload: data
    }
};
export const getDriverPreviousRides = data => {
    return {
        type: "GET_DRIVER_PREVIOUS_RIDE",
        payload: data
    }
};
export const getDriverUpcomingRides = data => {
    return {
        type: "GET_DRIVER_UPCOMING_RIDE",
        payload: data
    }
};
export const getDriverAllUpcomingRides = data => {
    return {
        type: "GET_DRIVER_ALL_UPCOMING_RIDE",
        payload: data
    }
};
export const getDriverLatestJourney = data => {
    return {
        type: "GET_DRIVER_LATEST_JOURNEY",
        payload: data
    }
};
export const setStartJourney = data => {
    return {
        type: "SET_START_JOURNEY",
        payload: data
    }
};
export const setEndJourney = data => {
    return {
        type: "SET_END_JOURNEY",
        payload: data
    }
};


export function getDriverLatestJourneyData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userid", requestBody);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/driversLatestJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getDriverLatestJourney(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function getDriverAllUpcomingRidesData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", requestBody);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/upcomingRidesForDriver', requestOptions).then(response => response.json()).then(res => {
            dispatch(getDriverAllUpcomingRides(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function getDriverPreviousRidesData(requestBody) {
    return dispatch => {
        return fetch(BASE_URL + '/journey/driversPreviousJourney/'+ requestBody, {
            method: 'GET',
        }).then(response => response.json()).then(res => {
            dispatch(getDriverPreviousRides(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function getDriverUpcomingRidesData(requestBody) {
    return dispatch => {
        return fetch(BASE_URL + '/journey/driversUpcomingJourney/'+ requestBody, {
            method: 'GET',
        }).then(response => response.json()).then(res => {
            dispatch(getDriverUpcomingRides(res));

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function setStartJourneyData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", data.journeyId);
        urlencoded.append("startOTP", data.startOTP);
        urlencoded.append("startOdoMeter", data.startOdoMeter);
        urlencoded.append("startOdoMeterImg", data.startOdoMeterImg);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/startJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getDriverLatestJourney(res));
            getDriverLatestJourneyData(data.userId);
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function setEndJourneyData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", data.journeyId);
        urlencoded.append("endOTP", data.endOTP);
        urlencoded.append("endOdoMeter", data.endOdoMeter);
        urlencoded.append("endOdoMeterImg", data.endOdoMeterImg);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/endJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getDriverLatestJourney(res));
            getDriverLatestJourneyData(data.userId);
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
