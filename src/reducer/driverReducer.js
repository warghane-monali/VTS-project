const initialState = {
    loading: false,
    driverUserList: [],
    tabIndexData:null,
    driverPreviousRides: [],
    driverUpcomingRides: [],
    driverAllUpcomingRides: [],
    driverAllUpcomingRideswithdate:[],
    driversLatestJourney:{},
    driverattendance:[],
    setDriverAttendance:{},
    vehicleCheckIn:{},
    vehicleCheckOut:{},
    vehicleCheckInOut:{},
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
            case 'GET_DRIVER_ALL_UPCOMING_RIDE_WITH_DATE':
                return {
                    ...state,
                    driverAllUpcomingRideswithdate:action.payload,
                    error:null,
                }
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
                    vehicleCheckIn:action.payload,
                    error:null
                };
            case 'SET_DRIVER_CHECK_OUT':
                return{
                    ...state,
                    vehicleCheckOut:action.payload,
                    error:null
                };
            case 'GET_DRIVER_CHECK_IN_OUT':
                return{
                    ...state,
                    vehicleCheckInOut:action.payload,
                    error:null
                }
        case "LOGOUT": return {};
        default:
            return state
    }
};

export default driverReducer
