const initialState = {
    loading: false,
    driverUserList: [],
    tabIndexData:null,
    driverPreviousRides: [],
    driverUpcomingRides: [],
    driverAllUpcomingRides: [],
    driversLatestJourney:{},
    driverattendance:[],
    setDriverAttendance:{},
    setVehicleCheckIn:{},
    error: null,
};

const driverReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DRIVER_LATEST_JOURNEY':
            return {
                ...state,
                driversLatestJourney:action.payload,
                error: null,
            };
        case 'GET_TAB_INDEX':
            return {
                ...state,
                tabIndexData:action.payload,
                error: null,
            };
        case 'GET_DRIVER_PREVIOUS_RIDE':
            return {
                ...state,
                driverPreviousRides:action.payload,
                error: null,
            };
        case 'GET_DRIVER_UPCOMING_RIDE':
            return {
                ...state,
                driverUpcomingRides:action.payload,
                error: null,
            };
        case 'GET_DRIVER_ALL_UPCOMING_RIDE':
            return {
                ...state,
                driverAllUpcomingRides:action.payload,
                error: null,
            };
            case 'SET_DRIVER_ATTENDANCE':
                return {
                    ...state,
                    setDriverAttendance:action.payload,
                    error: null,
                };
            case 'GET_DRIVER_Attendance':
                return {
                    ...state,
                    driverattendance:action.payload,
                    error: null,
                };
            case 'SET_DRIVER_CHECK_IN':
                return{
                    ...state,
                    setVehicleCheckIn:action.payload,
                    error:null
                }
        case "LOGOUT": return {};
        default:
            return state
    }
};

export default driverReducer
