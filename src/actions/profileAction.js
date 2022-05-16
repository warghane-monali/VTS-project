import {BASE_URL} from "../utils/urls";


export const setProfileUpdate = data => {
    return {
        type: "PROFILE_UPDATE",
        payload: data
    }
};

export const setProfilePicUpdate = data => {
    return {
        type: "PROFILE_PIC_UPDATE",
        payload: data
    }
};

export const setChangePassword = data => {
    return {
        type: "CHANGE_PASSWORD",
        payload: data
    }
};

export const getSingleUser = data => {
    return {
        type: "GET_SINGLE_USER",
        payload: data
    }
};


export function setProfileUpdateData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", data.userId);
        urlencoded.append("firstName",  data.firstName);
        urlencoded.append("lastName", data.lastName);
        urlencoded.append("emailId", data.emailId);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/user/useru', requestOptions).then(response => response.json()).then(res => {
            // dispatch(setProfileUpdate({user:res}));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setProfilePicUpdateData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("userId", data.userId);
        urlencoded.append("identityPicURL", data.identityPicURL);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/user/useruprofile', requestOptions).then(response => response.json()).then(res => {
            dispatch(setProfilePicUpdate({user:res}));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
export function setChangePasswordData(data) {
    return dispatch => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("userId", data.userId);
        urlencoded.append("oldPassword", data.oldPassword);
        urlencoded.append("newPassword",  data.newPassword);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        return fetch(BASE_URL + '/user/userup', requestOptions).then(response => response.json()).then(res => {
            // dispatch(setChangePassword({user:res}));
            return res
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
export function getSingleUserData(data) {
    return dispatch => {
        return fetch(BASE_URL + '/user/userV', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        }).then(response => response.json()).then(res => {
            dispatch(getSingleUser({user:res}));
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
