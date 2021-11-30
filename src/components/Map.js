// import { child, get, getDatabase, ref } from "firebase/database";
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState, useRef, useEffect } from 'react';
import mapFunc from '../services/mapFunc'
import '../fbconfig.js';
import '../styles/Map.css'


export default function Maps(props) {
    
    //useEffect to update when props changes
    useEffect(() => {
        
        var map = mapFunc(window.google);

        props.dispatch({
            type: 'MAP',
            payload: map,
        });

        //create all markers
        props.state.store.map((cards) => {
            return new window.google.maps.Marker({
                position: { lat: cards.location.lat, lng: cards.location.lng },
                map : map,
                title: cards.name,
            });
        });
        
        //add a listener on the close/show btn on the map
        // document.getElementById('mapBtn').addEventListener('click',()=>{
        //     props.toggle.setShowState(!props.toggle.showState);
        // });

        // if(props.toggle.showState === true){
        //     document.getElementById('map').addClass("hideMap"); 
        // } else {
        //     document.getElementById('map').addClass("showMap");
        // }

    },[props.state.store])


    // const styles = {
    //     // top: "109px",
    //     // height: "100%",
    // }
      return (
        <div id="map">
            {/* <img src="../../public/Btn.svg" alt="close map" id="mapBtn"></img> */}
        </div>
      );
}
    

// export default GoogleApiWrapper({
//     //To be used in development mode only.
//     apiKey: 'AIzaSyD7sWrpN3kV89Nw-ZF77sCb-zljQao9N-w'
// })(Maps);

