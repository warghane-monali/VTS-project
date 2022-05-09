const initialState = {
    loading: false,
    adminDetails: null,
    requestStatus: null,
    requestStatusAdmin: null,
    driverUserList: [],
    previousRides: [],
    upcomingRides: [],
    upcomingPreviousRides: null,
    employeeList: [],
    employeeWiseJourney: [],
    carList: null,
    driverList: null,
    journeyCount: null,
    reports: null,
    error: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADMIN_LOGIN_SUCCESS':
            return {
                ...state,
                adminDetails:action.payload,
                error: null,
            };
        case 'REQUEST_STATUS_DATA':
            return {
                ...state,
                requestStatus:action.payload,
                error: null,
            };
        case 'REQUEST_STATUS_ADMIN_DATA':
            return {
                ...state,
                requestStatusAdmin:action.payload,
                error: null,
            };
        case 'GET_DRIVER_USER_LIST':
            return {
                ...state,
                driverUserList:action.payload,
                error: null,
            };
        case 'GET_USER_PREVIOUS_RIDE':
            return {
                ...state,
                previousRides:action.payload,
                error: null,
            };
        case 'GET_ADMIN_UPCOMING_PREVIOUS_RIDE':
            return {
                ...state,
                upcomingPreviousRides:action.payload,
                error: null,
            };
        case 'GET_USER_UPCOMING_RIDE':
            return {
                ...state,
                upcomingRides:action.payload,
                error: null,
            };
        case 'GET_EMPLOYEE_WISE_JOURNEY':
            return {
                ...state,
                employeeWiseJourney:action.payload,
                error: null,
            };
        case 'GET_EMPLOYEE_LIST':
            return {
                ...state,
                employeeList:action.payload,
                error: null,
            };
        case 'GET_JOURNEY_COUNT':
            return {
                ...state,
                journeyCount:action.payload,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                loading: false,
                userDetails: null,
                error: action.payload
            };
        case "SET_ADMIN_REPORTS":
            return {
                loading: false,
                reports: action.payload,
                error: null,
            };
        case "GET_CAR_LIST":
            return {
                loading: false,
                carList: action.payload,
                error: null,
            };
        case "GET_DRIVER_LIST":
            return {
                loading: false,
                driverList: action.payload,
                error: null,
            };
        case "LOGOUT": return {};
        default:
            return state
    }
};

export default adminReducer
