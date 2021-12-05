import React, { useEffect } from 'react';
import '../fbconfig.js';
import mapFunc from '../services/mapFunc';
import '../styles/Map.css';


export default function Maps(props) {
    
    //useEffect to update when the store state changes
    useEffect(() => {
        
        var map = mapFunc(window.google);

        //add the map to the state to make it available into the whole app
        props.dispatch({
            type: 'MAP',
            payload: map,
        });

        //Display markers from the store
        props.state.store.map((cards) => {
            return new window.google.maps.Marker({
                position: { lat: cards.location.lat, lng: cards.location.lng },
                map : map,
                title: cards.name,
            });
        });
    },[props.state.store])

    //Add the listener to the hide-button to toogle the hide and show of the map
    useEffect(()=>{
        const hideMapBtn = document.getElementById("hide-map-btn");
        hideMapBtn.addEventListener('click',()=>{
            props.dispatch({
                type : 'TOOGLE',
                payload: false
            })
        })

        return ()=>{
            hideMapBtn.removeEventListener('click',()=>{
                props.dispatch({
                    type : 'TOOGLE',
                    payload: false
                })
            })
        }
    })

      return (
          <div>
              <div id="map"></div>
              <div 
                id="hide-map-btn" 
                class="hide-map-btn"
              >Close map</div>
          </div>
      );
}
    


