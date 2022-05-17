import {BASE_URL} from "../utils/urls";
import axios from 'axios';

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
export const setDriverAttendance = data => {
    return {
        type: "SET_DRIVER_ATTENDANCE",
        payload: data
    }
};
export const getDriverAttendance = data => {
    return {
        type: "GET_DRIVER_Attendance",
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
export function setDriverAttendanceData(userDetails,startDateTime, endDateTime) {
    return dispatch => {
        console.log("---------setDriverAttendanceData--------------",userDetails.user);
        console.log("---------setDriverAttendanceData--------------",startDateTime);
        console.log("---------setDriverAttendanceData--------------",endDateTime);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("startDateTime", startDateTime);
        urlencoded.append("endDateTime", endDateTime);
        urlencoded.append("driverId", userDetails.user._id);
        urlencoded.append("driverName", userDetails.user.firstName);
        urlencoded.append("driverNo", userDetails.user.contactNo);
        // urlencoded.append("username", userDetails.user.firstName);
        // urlencoded.append("username", userDetails.user.name);
       
        console.log("---------setDriverAttendanceData urlencoded--------------",urlencoded);
       
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL+'/driverattendance/insertdriverattendance', requestOptions).then(response => response.json()).then(res => {
            dispatch(setDriverAttendance(res));
            console.log('success', res);
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    
}
// export function getdriverattendanceData(data) {
//     return dispatch => {

//         let urlencoded = new URLSearchParams();
//         urlencoded.append("driverId",data.driverId);
       
//         return fetch(BASE_URL + '/driverattendance/getdriverattendance'+ data, {
//             method: 'POST',
//         }).then(response => response.json()).then(res => {
//             dispatch(getDriverAttendance(res));
//             console.log('resssssssssss',res)

//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     }
// }
export function getdriverattendanceData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("driverId", "1");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                driverId: requestBody._id
            }),
            redirect: 'follow'
        };

        console.log('requestOptions', requestOptions)


        return axios.post(BASE_URL + '/driverattendance/getdriverattendance', {driverId: requestBody._id})
        .then(response => response.data)
        .then(res => {
            console.log('response', res)
            dispatch(getDriverAttendance(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}