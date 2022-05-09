const INITIAL_STATE={
    location:{},
    sourceLocation:{},
    destinationLocation:{},
    changeLang: false,
    error: ''
};

export default function trackLocationReducer(state=INITIAL_STATE,action){
    switch (action.type) {
        case 'TRACK_LOCATION_SUCCESS':
            return{
                ...state,
                location:action.data,
            };
        case 'CHANGE_LANG':
            return{
                ...state,
                changeLang:action.data,
            };
        case 'TRACK_LOCATION_FAILED':
            return{
                ...state,
                error:action.data,
            };
        case 'SOURCE_LOCATION':
            return{
                ...state,
                sourceLocation:action.data,
            };
        case 'DESTINATION_LOCATION':
            return{
                ...state,
                destinationLocation:action.data,
            };
        default:
            return state
    }
}
