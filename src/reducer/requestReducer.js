

const initialState = {
    loading: false,
    requestRideData: null,
    vehicleList: [],
    travellerListData: [],
    allUserList: [],
    travellerPreviousRides: [],
    travellerUpcomingRides: [],
    travellerUpcomingPreviousRides: [],
    travellersAllPreviousJourney: [],
    travellersAllUpcomingJourney: [],
    travellersLatestJourney:{},
    error: null,
};

const requestReducer = (state = initialState, action) => {
    console.log('Reducer: ', action);
    switch (action.type) {
        case 'GET_VEHICLE_LIST':
            return {
                ...state,
                vehicleList: action.payload,
                error: null, 
            }; 
        case 'SET_TRAVELLER_LIST':
            return {
                ...state,
                travellerListData: action.payload,
                error: null,
            };
        case 'SET_TRAVELLER_REQUEST':
            return {
                ...state,
                requestRideData: action.payload,
                error: null,
            };
        case 'GET_ALL_USER_LIST':
            return {
                ...state,
                allUserList: action.payload,
                error: null,
            };
        case 'REQUEST_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'REQUEST_FAILURE':
            return {
                loading: false,
                requestRideData: null,
                error: action.payload,
            };
        case 'FLUSH_REQUEST_STATE':
            return {
                loading: false,
                requestRideData: null,
                error: null,
            };
        case 'GET_TRAVELLER_LATEST_JOURNEY':
            return {
                ...state,
                travellersLatestJourney:action.payload,
                error: null,
            };
        case 'GET_TRAVELLER_ALL_PREVIOUS_JOURNEY':
            return {
                ...state,
                travellersAllPreviousJourney:action.payload,
            };
        case 'GET_TRAVELLER_ALL_UPCOMING_JOURNEY':
            return {
                ...state,
                travellersAllUpcomingJourney:action.payload,
            };
        case 'GET_TRAVELLER_PREVIOUS_RIDE':
            return {
                ...state,
                travellerPreviousRides:action.payload,
                error: null,
            };
        case 'GET_TRAVELLER_UPCOMING_RIDE':
            return {
                ...state,
                travellerUpcomingRides:action.payload,
                error: null,
            };
        case 'GET_TRAVELLER_UPCOMING_PREVIOUS_RIDE':
            return {
                ...state,
                travellerUpcomingPreviousRides:action.payload,
                error: null,
            };
        case "LOGOUT": return {};
        default:
            return state
    }
};

export default requestReducer
