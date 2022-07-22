import axios from "axios";
import reactDom from "react-dom";
import { BASE_URL } from "../utils/urls";
import { getVehicleListData } from "./requestAction";


export const adminLoginSuccess = data => {
    return {
        type: "ADMIN_LOGIN_SUCCESS",
        payload: data
    }
};
export const setRequestStatus = data => {
    return {
        type: "REQUEST_STATUS_DATA",
        payload: data
    }
};
export const setRequestStatusAdmin = data => {
    return {
        type: "REQUEST_STATUS_ADMIN_DATA",
        payload: data
    }
};
export const setRejectCancelStatus = data => {
    return {
        type: "REJECTED_CANCEL_STATUS_DATA",
        payload: data
    }
};
export const getDriverUserList = data => {
    return {
        type: "GET_DRIVER_USER_LIST",
        payload: data
    }
};
export const getUpcomingPreviousRidesAdmin = data => {
    return {
        type: "GET_ADMIN_UPCOMING_PREVIOUS_RIDE",
        payload: data
    }
};
export const getUserPreviousRides = data => {
    return {
        type: "GET_USER_PREVIOUS_RIDE",
        payload: data
    }
};
export const getUserUpcomingRides = data => {
    return {
        type: "GET_USER_UPCOMING_RIDE",
        payload: data
    }
};
export const getEmployeeWiseJourneys = data => {
    return {
        type: "GET_EMPLOYEE_WISE_JOURNEY",
        payload: data
    }
};
export const getEmployeeList = data => {
    return {
        type: "GET_EMPLOYEE_LIST",
        payload: data
    }
};
export const getTravellerUpcomingPreviousCountJourney = data => {
    return {
        type: "GET_JOURNEY_COUNT",
        payload: data
    }
};
export const setAdminReports = data => {
    return {
        type: "SET_ADMIN_REPORTS",
        payload: data
    }
};
export const getCarList = data => {
    return {
        type: "GET_CAR_LIST",
        payload: data
    }
};
export const getDriverList = data => {
    return {
        type: "GET_DRIVER_LIST",
        payload: data
    }
};
export const getDriverattendanceList = (payload) => {
    return {
        type: "GET_DRIVER_LIST",
        payload
    }
};
export const SetattendanceStatus = data => {
    return {
        type: "SET_DRIVER_ATTENDANCE_STATUS",
        payload: data
    }
};
export const getFeedBackQue = data => {
    return {
        type: "GET_FEEDBACK_QUE",
        payload: data
    }
};
export const getFeedBack = data => {
    return {
        type: "GET_FEEDBACK",
        payload: data
    }
};
export const getJourneyAllCount = data => {
    return{
        type:"GET_ALL_JOURNEY_COUNT",
        payload:data
    }
}
export const setPassword = data => {
    return{
        type:"SET_PASSWORD",
        payload:data
    }
}
export const addEmployee = data => {
    return{
        type:"ADD_EMPLOYEE_DETAILS",
        payload:data
    }
}


export function setRequestStatusData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", data.userId);
        urlencoded.append("requestStatus", data.requestStatus);
        urlencoded.append("startDateTime", data.startDateTime);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/requestStatusDate', requestOptions).then(response => response.json()).then(res => {
            dispatch(setRequestStatus(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setAllRequestStatusData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // let urlencoded = new URLSearchParams();
        // urlencoded.append("requestStatus", data.requestStatus);
        // urlencoded.append("requestLocationOfAdmin", JSON.stringify(data.requestLocationOfAdmin));

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/allStatusWiseJournees', requestOptions).then(response => response.json()).then(res => {
            dispatch(setRequestStatusAdmin(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setRequestStatusAdminData(data) {

    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // let urlencoded = new URLSearchParams();
        // urlencoded.append("requestStatus", data.requestStatus);
        // urlencoded.append("startDateTime", data.startDateTime);
        // urlencoded.append("requestLocationOfAdmin", data.requestLocationOfAdmin);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/requestStatusDateAdmin', requestOptions).then(response => response.json()).then(res => {
            dispatch(setRequestStatusAdmin(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setRequestStatusAdminDataReports(startDate, endDate) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("startDate", startDate);
        urlencoded.append("endDate", endDate);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/dateWiseRides', requestOptions).then(response => response.json()).then(res => {
            dispatch(setAdminReports(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setAcceptStatusData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", data?.journeyId);
        urlencoded.append("vehicleId", data?.vehicleId);
        urlencoded.append("agencyName", data?.agencyName);
        urlencoded.append("vehicleName", data?.vehicleName);
        urlencoded.append("vehicleNo", data?.vehicleNo);
        urlencoded.append("driverId", data?.driverId);
        urlencoded.append("driverName", data?.driverName);
        urlencoded.append("driverNo", data?.driverNo);
        urlencoded.append("updatedBy", data?.updatedBy);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/acceptStatus', requestOptions).then(response => response.json()).then(res => {
            dispatch(setRequestStatus(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setRejectCancelStatusData(data) {
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
            dispatch(setRequestStatus(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setRejectStatusData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("rejectReasonOption", data.rejectReasonOption);
        urlencoded.append("rejectReason", data.rejectReason);
        urlencoded.append("requestStatus", data.requestStatus);
        urlencoded.append("journeyId", data.journeyId);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/rejectStatus', requestOptions).then(response => response.json()).then(res => {
            dispatch(setRequestStatus(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getDriverListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userRole", "Driver");
        urlencoded.append("startDate", data.startDate);
        urlencoded.append("endDate",data.endDate);
        urlencoded.append("lat", data.sourceLat);
        urlencoded.append("log", data.sourceLong);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/user/getdriverlist', requestOptions).then(response => response.json()).then(res => {
             dispatch(getDriverList(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getCarListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("agencyName", data.userRole);
        urlencoded.append("startDate", data.startDate);
        urlencoded.append("lat", data.lat);
        urlencoded.append("log", data.log);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/vehicle/getcarlist', requestOptions).then(response => response.json()).then(res => {
            // dispatch(getCarList(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getDriverUserListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("userRole", "Driver");
        urlencoded.append("startDate", data.startDateTime);
        urlencoded.append("endDate",data.endDateTime);
        urlencoded.append("lat", data.sourceLat);
        urlencoded.append("log", data.sourceLong);


        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };
        return fetch(BASE_URL + "/user/getdriverlist", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let filteredData = result.reduce((unique, o) => {
                    if (!unique.some(obj => obj.contactNo === o.contactNo)) {
                        unique.push(o);
                    }
                    return unique;
                }, []);
                dispatch(getDriverUserList(filteredData));
                return filteredData;
            })
            .catch((error) => {
                console.log("error", error)
            });
    }
}
export function addDriverListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("firstName", data.firstName);
        urlencoded.append("middleName", data.middleName);
        urlencoded.append("lastName", data.lastName);
        urlencoded.append("emailId", data.emailId);
        urlencoded.append("contactNo", data.contactNo);
        urlencoded.append("designation", data.designation);
        urlencoded.append("identityNumber", data.identityNumber);
        urlencoded.append("identityType", data.identityType);
        urlencoded.append("userRole", data.userRole);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/user/usera', requestOptions).then(response => response.json()).then(res => {
            dispatch(getDriverUserListData(res));
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function updateDriverListData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", data.userId);
        urlencoded.append("firstName", data.firstName);
        urlencoded.append("middleName", data.middleName);
        urlencoded.append("lastName", data.lastName);
        urlencoded.append("emailId", data.emailId);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/user/userU', requestOptions).then(response => response.json()).then(res => {
            dispatch(getDriverUserListData());
            console.log("-----Update driver response-------",res)
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getUpcomingPreviousRidesAdminData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // let urlencoded = new URLSearchParams();
        // urlencoded.append("startDateTime", requestBody.startDateTime);
        // urlencoded.append("requestLocationOfAdmin", requestBody.requestLocationOfAdmin);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(requestBody),
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/upcomingPreviousRidesAdmin', requestOptions).then(response => response.json()).then(res => {
            dispatch(getUpcomingPreviousRidesAdmin(res));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getUserPreviousRidesData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // let urlencoded = new URLSearchParams();
        // urlencoded.append("requestLocationOfAdmin", data.requestLocationOfAdmin);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/journey/previousrides',requestOptions).then(response => response.json()).then(res => {
            dispatch(getUserPreviousRides(res));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function getUserUpcomingRidesData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // let urlencoded = new URLSearchParams();
        // urlencoded.append("requestLocationOfAdmin", data.requestLocationOfAdmin);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/upcomingrides',requestOptions).then(response => response.json()).then(res => {
            dispatch(getUserUpcomingRides(res));

        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getTravellerUpcomingPreviousCountJourneyData(requestBody) {
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

        return fetch(BASE_URL + '/journey/travelerUpcomingPreviousCountJourney', requestOptions).then(response => response.json()).then(res => {
            dispatch(getTravellerUpcomingPreviousCountJourney(res));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getEmployeeWiseJourneysData(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", requestBody);
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };
        return fetch(BASE_URL + "/journey/empwiserides", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                dispatch(getEmployeeWiseJourneys(result));
            })
            .catch((error) => {
                console.log("error", error)
            });
    }
}
export function getEmployeeListData(requestBody) {
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
        return fetch(BASE_URL + "/user/userav", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let filteredData = result.reduce((unique, o) => {
                    if (!unique.some(obj => obj.contactNo === o.contactNo)) {
                        unique.push(o);
                    }
                    return unique;
                }, []);
                dispatch(getEmployeeList(filteredData));
                return filteredData;
            })
            .catch((error) => {
                console.log("error", error)
            });
    }
}
export function getDriverattendanceListData() {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let requestOptions = {
            method: 'GET',
        }
        return fetch(BASE_URL + '/driverattendance/getalldriverattendance', requestOptions).then((response) => response.json())
            .then((result) => {
            dispatch(getDriverattendanceList(result));
            return result
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function editDriverJourney(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", requestBody.journeyId);
        urlencoded.append("driverId", requestBody.driverId);
        urlencoded.append("driverName", requestBody.driverName);
        urlencoded.append("driverNo", requestBody.driverNo);
        urlencoded.append("updatedBy", requestBody.updatedBy);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL+"/journey/editdriverjourney", requestOptions)
        .then((response) => response.json())
        .then((result) => {

            return result;
        })
        .catch((error) => {
            console.log("error", error)
        });
}
}
export function SetattendanceStatusData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("driverAttendanceId",data.driverAttendanceId);
        urlencoded.append("status",data.status);
        urlencoded.append("updatedBy",data.updatedBy);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/driverattendance/updatedriverattendancestatus', requestOptions)
            .then(response => response.data)
            .then(res => {
                dispatch(SetattendanceStatus(res));
                getDriverattendanceListData()
            return res

        }).catch(error => console.log('error', error));
    }
}
export function editVehicleJourney(requestBody) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", requestBody.journeyId);
        urlencoded.append("vehicleId", requestBody.vehicleId);
        urlencoded.append("agencyName", requestBody.agencyName);
        urlencoded.append("vehicleName", requestBody.vehicleName);
        urlencoded.append("vehicleNo", requestBody.vehicleNo);
        urlencoded.append("updatedBy", requestBody.updatedBy);
        


        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch(BASE_URL+"/journey/editvehiclejounrey", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.log("error", error)
        });
    }
}
export function getFeedBackQueData() {
    return dispatch => {
        let requestOptions = {
            method: 'GET'
        };
        return fetch('https://testvtsfeedbackapi.foxberry.link/v1/feedbackentityquestion/getfeedbackquestion', requestOptions).then(response => response.json()).then(res => {
            dispatch(getFeedBackQue(res));
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function setFeedBackQueData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(data[0]);
        console.log("---Raw Data---",raw)

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        return fetch('https://testvtsfeedbackapi.foxberry.link/v1/feedback/insertfeedbacka', requestOptions).then(response => response.json()).then(res => {
            dispatch(getFeedBackQue(data));
        return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function getFeedBackData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", data);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch('https://testvtsfeedbackapi.foxberry.link/v1/feedback/getfeedback', requestOptions).then(response => response.json()).then(res => {
            dispatch(getFeedBack(res))
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function getJourneyAllCountData(data) {
    console.log('In getJourneyAllCountData')
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // let urlencoded = new URLSearchParams();
        // urlencoded.append("requestLocationOfAdmin", data.userLocation);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        return fetch(BASE_URL + '/journey/requeststatusdateadmincount', requestOptions).then(response => response.json()).then(res => {
            console.log('-----Journey Count API RES-----',res)
            dispatch(getJourneyAllCount(res));
            return res;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function setPasswordData(data) {
    console.log('-----New Password---',data.password)
    console.log('-----Driver Id------',data.userId)
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", data.userId);
        urlencoded.append("newPassword", data.password);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/user/updateuserpasswordnewuser', requestOptions).then(response => response.json()).then(res => {
            dispatch(setPassword(res));
            return res;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function getFeedBackAnsData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("journeyId", data);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch('https://testvtsfeedbackapi.foxberry.link/v1/feedback/getfeedbackans', requestOptions).then(response => response.json()).then(res => {
            dispatch(getFeedBack(res));
            return res;
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function addEmployeeData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("firstName", data.firstName);
        urlencoded.append("middleName", data.middleName);
        urlencoded.append("lastName", data.lastName);
        urlencoded.append("emailId", data.emailId);
        urlencoded.append("contactNo", data.contactNo);
        urlencoded.append("designation", data.designation);
        urlencoded.append("identityNumber", data.identityNumber);
        urlencoded.append("identityType", data.identityType);
        urlencoded.append("subLocation", data.subLocation);
        urlencoded.append("mainLocation", data.mainLocation);
        urlencoded.append("vertical", data.vertical);
        urlencoded.append("subVertical", data.subVertical);
        // urlencoded.append("createdBy", data.createdBy);
       
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/user/usera', requestOptions).then(response => response.json()).then(res => {
            dispatch(addEmployee(res));
            console.log('hvjhbs',res)
            return res
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}