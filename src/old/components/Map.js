import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "../assets/styles/map.css"



export class Maps extends React.Component {
    render() {
        return (
            <div className="maps">
                <Map
                    google={this.props.google}
                    zoom={9}
                    initialCenter={
                        {
                            lat: -1.9433,
                            lng: 30.0587
                        }
                    }
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Kigali city'}
                    />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    //To be used in project work only.
    apiKey: 'AIzaSyCmmsdtrrQsusZXE3VV9UagM_0FKjWys8c'
})(Maps);
