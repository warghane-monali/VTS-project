import {BASE_URL} from "../utils/urls";
import {adminLoginSuccess} from "./adminAction";


export const loginRequest = () => {
    return {
        type: "LOGIN_REQUEST"
    }
};

export const loginSuccess = data => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
};

export const loginFailure = error => {
    return {
        type: "LOGIN_FAILURE",
        payload: error
    }
};

export const sendOtpSuccess = data => {
    return {
        type: "SEND_OTP_SUCCESS",
        payload: data
    }
};

export const sendOtpFailure = error => {
    return {
        type: "SEND_OTP_FAILURE",
        payload: error
    }
};
export const verifySuccess = data => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
};

export const verifyFailure = error => {
    return {
        type: "VERIFY_OTP_FAILURE",
        payload: error
    }
};
export const logout = () => {
    return {
        type: "LOGOUT",
    }
};

export function login(data) {
    return dispatch => {
        return fetch(BASE_URL+'/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(response => {
            if(response.user && response.user.userRole==='Admin'){
                dispatch(adminLoginSuccess(response))
            }
            else if(response.user && response.user.userRole==='SuperAdmin'){
                dispatch(adminLoginSuccess(response))
            } else if(response.user && response.user.userRole==='Driver'|| response.user &&response.user.userRole==='Traveller' ){
                dispatch(loginSuccess(response))
            }
            return response
        })
        .catch((error) => {
            const errorMessage = error.response;
            dispatch(loginFailure(errorMessage))
        });
    }
}
export function sendOtp(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("contactNo", data);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL+'/user/sendOtp', requestOptions)
            .then(response => response.json())
            .then(response => {
                dispatch(sendOtpSuccess(response))
            })
            .catch((error) => {
                const errorMessage = error.response.data.error;
                dispatch(sendOtpFailure(errorMessage))
            });
    }
}

export function verifyOtp(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("contactNo", data.contactNo);
        urlencoded.append("newLoginOtp", data.newLoginOtp);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL+'/user/verifyOTP', requestOptions)
            .then(response => response.json())
            .then(response => {
                if(response.user.userRole==='Driver' || response.user.userRole==='Traveller' ){
                    dispatch(verifySuccess(response))
                }
                return response
            })
            .catch((error) => {
                dispatch(verifyFailure(error))
            });
    }
}
export function userLogout(data) {
    return dispatch => {
       localStorage.clear();
        dispatch(logout())
    }
}
