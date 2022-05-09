const initialState = {
    loading: false,
    userDetails: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    console.log('Auth Reducer: ', action);
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'PROFILE_UPDATE':
            return {
                ...state,
                userDetails:action.payload,
                error: null,
            };
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                userDetails:action.payload,
                error: null,
            };
        case 'GET_SINGLE_USER':
            return {
                loading: false,
                userDetails: action.payload,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                loading: false,
                userDetails: action.payload,
                error: null
            };

        case "LOGIN_FAILURE":
            return {
                loading: false,
                userDetails: null,
                error: action.payload
            };
        case "SEND_OTP_SUCCESS":
            return {
                loading: false,
                userDetails: null,
                error: action.payload
            };
        case "VERIFY_OTP_SUCCESS":
            return {
                loading: false,
                userDetails: null,
                error: action.payload
            };
        case "LOGOUT": return {};
        default:
            return state
    }
};

export default authReducer
