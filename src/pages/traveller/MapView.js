import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import * as ActionCreators from "../../actions/trackLocationAction";
import {connect, useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import Geocode from "react-geocode";
import {trackSourceLocation, trackDestinationLocation} from "../../actions/trackLocationAction";
Geocode.setApiKey("AIzaSyC1JGc-xX3lFEzCId2g3HQcKv1gpE7Oejo");

const containerStyle = {
    width: '98vw',
    height: '95vh'
};



function MapView({destinationLocation, sourceLocation, location, trackLocationSuccess, trackSourceLocation, trackDestinationLocation}) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC1JGc-xX3lFEzCId2g3HQcKv1gpE7Oejo"
    });
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const routeLocation = useLocation();
    const [requestStatus, setRequestStatus] = useState(routeLocation?.state);
    const [map, setMap] = React.useState(null);
    const [markerPosition, setMarkerPosition] = React.useState(location);
    const [markerSourcePosition, setMarkerSourcePosition] = React.useState(sourceLocation);
    const [markerDestinationPosition, setMarkerDestinationPosition] = React.useState(destinationLocation);
    const [place, setPlace] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

   useEffect(()=> {
       Geocode.fromLatLng(location.lat,location.lng).then(
           (response) => {
               const address = response.results[0].formatted_address;
               console.log(address);
               setPlace(address)
           },
           (error) => {
               console.error(error);
           }
       );
   },[]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat:location && location.lat, lng:location && location.lng}}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            <Marker
                draggable={true}
                clickable={true}
                onDragEnd={((e) => {
                    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
                        (response) => {
                            const address = response.results[0].formatted_address;
                            console.log(address);
                            setPlace(address)
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                })}
                position={markerPosition}>
                <InfoWindow options={{ maxWidth: 150 }}>
                    <span>{place}</span>
                </InfoWindow>
            </Marker>
            {requestStatus === 'source'?<Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2} style={{position:'absolute', bottom:25, left:'25%', right:'25%'}}>
                <Button size="medium" variant="contained" onClick={e => {
                    dispatch(trackSourceLocation({lat: sourceLocation.lat, lng: sourceLocation.lng, place: place}));
                    navigate('/dashboard/request', {state: {name:'source', place: place}})
                }}>
                    Select source location
                </Button>
            </Stack>:<Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2} style={{position:'absolute', bottom:25, left:'25%', right:'25%'}}>
                <Button size="medium" variant="contained" onClick={e => {
                    dispatch(trackDestinationLocation({lat: sourceLocation.lat, lng: sourceLocation.lng, place: place}));
                    navigate('/dashboard/request', {state: {name:'destination', place: place}})
                }}>
                    Select Destination location
                </Button>
            </Stack>}
        </GoogleMap>
    ) : <></>
}

const mapStateToProps = state => {
    return {
        destinationLocation: state.trackLocation.destinationLocation,
        sourceLocation: state.trackLocation.sourceLocation,
        location: state.trackLocation.location,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        trackLocationSuccess: (requestBody) => dispatch(ActionCreators.trackLocationSuccess(requestBody)),
        trackSourceLocation: (requestBody) => dispatch(ActionCreators.trackSourceLocation(requestBody)),
        trackDestinationLocation: (requestBody) => dispatch(ActionCreators.trackDestinationLocation(requestBody)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MapView))

