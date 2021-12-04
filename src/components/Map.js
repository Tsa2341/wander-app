// import { child, get, getDatabase, ref } from "firebase/database";
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState, useRef, useEffect } from 'react';
import mapFunc from '../services/mapFunc'
import '../fbconfig.js';
import '../styles/Map.css'
import getDb from '../services/getDb';


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


        

    },[props.state.store])

      return (
        <div id="map">
        </div>
      );
}
    


