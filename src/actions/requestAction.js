import {BASE_URL} from "../utils/urls";
import {setRequestStatus} from "./adminAction";

export const flushRequestState = () => {
    return {
        type: "FLUSH_REQUEST_STATE"
    }
};
export const getVehicleList = (payload) => {
    return {
        type: "GET_VEHICLE_LIST",
        payload
    }
};
export const setTravellerListData = (payload) => {
    return {
        type: "SET_TRAVELLER_LIST",
        payload
    }
};
export const getAllUserList = (payload) => {
    return {
        type: "GET_ALL_USER_LIST",
        payload
    }
};
export const setTravellerRequest = (payload) => {
    return {
        type: "SET_TRAVELLER_REQUEST",
        payload
    }
};
export const getTravellerPreviousRides = data => {
    return {
        type: "GET_TRAVELLER_PREVIOUS_RIDE",
        payload: data
    }
};
export const getTravellerUpcomingRides = data => {
    return {
        type: "GET_TRAVELLER_UPCOMING_RIDE",
        payload: data
    }
};
export const getTravellerUpcomingPreviousRides = data => {
    return {
        type: "GET_TRAVELLER_UPCOMING_PREVIOUS_RIDE",
        payload: data
    }
};
export const getTravellerLatestJourney = data => {
    return {
        type: "GET_TRAVELLER_LATEST_JOURNEY",
        payload: data
    }
};
export const getTravellerAllPreviousJourney = data => {
    return {
        type: "GET_TRAVELLER_ALL_PREVIOUS_JOURNEY",
        payload: data
    }
};
export const getTravellerAllUpcomingJourney = data => {
    return {
        type: "GET_TRAVELLER_ALL_UPCOMING_JOURNEY",
        payload: data
    }
};
export const getVehicleMaintenance = data => {
    return {
        type: "GET_VEHICLE_MAINTENANCE",
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
export const setfeedback = data => {
    return{
        type: "SET_USER_FEEDBACK",
        payload: data
    }
}

export const setmaintenancelist = data => {
    return {
        type: "SET_VEHICLE_MAINTENANCE",
        payload : data
    }
}

export const setPetrolExpenselist = data => {
    return {
        type: "SET_VEHICLE_PETROL_EXPENSE",
        payload : data
    }
}
export const getPetrolExpenseList = data => {
    return {
        type: "GET_VEHICLE_PETROL_EXPENSE",
        payload : data
    }
}

export function getVehicleListData() {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("agencyName", "SAKAAL PAPERS LTD.");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/vehicle/vehicleAV', requestOptions).then(response => response.json()).then(res => {
            dispatch(getVehicleList(res));
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function addVehicleListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("agencyName", data.agencyName);
        urlencoded.append("agencyNumber", data.agencyNumber);
        urlencoded.append("vehicleType", data.vehicleType);
        urlencoded.append("vehicleName", data.vehicleName);
        urlencoded.append("capacity", data.capacity);
        urlencoded.append("vehicleNo", data.vehicleNo);
        urlencoded.append("manufactureYear", data.manufactureYear);
        urlencoded.append("model", data.model);
        urlencoded.append("make", data.make);
        urlencoded.append("homeLocation", data.homeLocation);
        urlencoded.append("createdBy", data.createdBy);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/vehicle/vehicleI', requestOptions).then(response => response.json()).then(res => {
            dispatch(getVehicleListData());
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function updateVehicleListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("vehicleId", data.vehicleId);
        urlencoded.append("agencyName", data.agencyName);
        urlencoded.append("agencyNumber", data.agencyNumber);
        urlencoded.append("vehicleType", data.vehicleType);
        urlencoded.append("vehicleName", data.vehicleName);
        urlencoded.append("capacity", data.capacity);
        urlencoded.append("vehicleNo", data.vehicleNo);
        urlencoded.append("updatedBy", data.updatedBy);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/vehicle/vehicleU', requestOptions).then(response => response.json()).then(res => {
            dispatch(getVehicleListData());
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function AddMaintenanceData(data){
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("vehicleId", data.vehicleId);
        urlencoded.append("vehicleName", data.vehicleName);
        urlencoded.append("vehicleNo", data.vehicleNo);
        urlencoded.append("maintenanceDescription", data.maintenanceDescription);
        urlencoded.append("maintenanceCost", data.maintenanceCost);
        urlencoded.append("maintenancePlace", data.maintenancePlace);
        urlencoded.append("maintenancePlaceNo", data.maintenancePlaceNo);
        urlencoded.append("maintenanceStartDate", data.maintenanceStartDate);
        urlencoded.append("maintenanceEndDate", data.maintenanceEndDate);
        urlencoded.append("odoMeterReading", data.odoMeterReading);
        urlencoded.append("homeLocation", data.homeLocation);
        urlencoded.append("createdBy", data.createdBy);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/vehiclemaintenance/insertvehiclemaintenance', requestOptions).then(response => response.json()).then(res => {
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function AddPetrolExpenseData(data){
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("vehicleId", data.vehicleId);
        urlencoded.append("vehicleName", data.vehicleName);
        urlencoded.append("vehicleNo", data.vehicleNo);
        urlencoded.append("petrolLiter", data.petrolLiter);
        urlencoded.append("petrolCost", data.petrolCost);
        urlencoded.append("petrolFIllingPlace", data.petrolFIllingPlace);
        urlencoded.append("Date", data.Date);
        urlencoded.append("filledBy", data.filledBy);
        urlencoded.append("odoMeterReading", data.odoMeterReading);


        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/vehiclepetrolfeeling/insertvehiclepetrolfeeling', requestOptions).then(response => response.json()).then(res => {

            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }
}

export function setTravellerRequestData(data) {
    return dispatch => {
        return fetch(BASE_URL + '/journey/travellerRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json()).then(res => {
            dispatch(setTravellerRequest(res));
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function setCancelStatusData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", data.journeyId);
        urlencoded.append("requestStatus", data.requestStatus);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/rejectCancelStatus', requestOptions).then(response => response.json()).then(res => {
            dispatch(setTravellerRequest(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export function getAllUserListData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("userRole", "Traveller");

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };
        fetch(BASE_URL+"/user/userav", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let filteredData = result.reduce((unique, o) => {
                    if(!unique.some(obj => obj.contactNo === o.contactNo)) {
                        unique.push(o);
                    }
                    return unique;
                },[]);
                dispatch(getAllUserList(filteredData));
            })
            .catch((error) => {
                console.log("error", error)
            });
    }
}

export function getTravellerLatestJourneyData(requestBody) {
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
        return fetch(BASE_URL + '/journey/travellerLatestJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getTravellerLatestJourney(res));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export function getTravellerAllPreviousJourneyData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("userId", requestBody);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/previousRidesForTraveler', requestOptions).then(response => response.json()).then(res => {
            dispatch(getTravellerAllPreviousJourney(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export function getTravellerAllUpcomingJourneyData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("userId", requestBody);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/upcomingRidesForTraveler', requestOptions).then(response => response.json()).then(res => {
            dispatch(getTravellerAllUpcomingJourney(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export function getTravellerPreviousRidesData(requestBody) {
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
        return fetch(BASE_URL + '/journey/driversPreviousJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getTravellerPreviousRides(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function getTravellerUpcomingPreviousRidesData(requestBody, date) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userid", requestBody);
        urlencoded.append("startDateTime", date);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/travelerUpcomingPreviousJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getTravellerUpcomingPreviousRides(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function getTravellerUpcomingRidesData(requestBody) {
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
        return fetch(BASE_URL + '/journey/treavellerUpcomingJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getTravellerUpcomingRides(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function getVehicleMaintenanceData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("vehicleId", requestBody);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/vehiclemaintenance/getvehiclemaintenancebyvehicle', requestOptions).then(response => response.json()).then(res => {
            dispatch(getVehicleMaintenance(res));
            return res
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
            // dispatch(getDriverLatestJourney(res));
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
            // dispatch(getDriverLatestJourney(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export function setfeedbackdata(userDetails){
    return dispatch => {
        console.log('In set feedback')

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", userDetails.user._id);


        let requestOptions ={
            method : 'PUT',
            headers : myHeaders,
            body : urlencoded,
            redirect : 'follow'
        }

        //return fetch(BASE_URL+'/journey/feedback',requestOptions).then(response => response.json())
       // .then(res => {
        //     dispatch(setfeedback(res));
        //     return res;
        // })
        // .catch( ( error ) => {
        //     console.log('error',error);
        // } );
    }
}


export function getPetrolExpenseListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("vehicleId", data);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/vehiclepetrolfeeling/getvehiclepetrolfeelingbyvehicle', requestOptions).then(response => response.json()).then(res => {
            dispatch(getPetrolExpenseList(res));
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
