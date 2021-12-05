import React, { useState, useEffect, useRef } from 'react'
import setMarker from '../helperFuncs/setMarker'
import removeMarker from '../helperFuncs/removeMarker'

export default function SearchResponse({ response,  index, state, dispatch }) {
    
    var marker = useRef();

    useEffect(() => {
        const handleMouseover = (e) => {
            marker.current = setMarker(response.location, response.name, state.map);
        }
        
        const handleMouseout = (e) => {
            removeMarker(marker.current);
        }

        const handleClick = (e) => {
            console.log(document.getElementById(index));
            dispatch({
                type: "ADD",
                payload: [response]
            })
        }

        var el = document.getElementById(index);
        el.addEventListener('mouseover', handleMouseover);

        el.addEventListener('mouseout', handleMouseout);
        
        el.addEventListener('click', handleClick)

        return (() => {
            el.removeEventListener('mouseover', handleMouseover);

            el.removeEventListener('mouseout', handleMouseout);
            
            el.removeEventListener('click', handleClick);
        }
        )
        
    })


    return (<div id={index} key={index} className="response-wrapper">
                <p>
                    { response.name }<br />
                    { response.address }
                </p>
            </div>
    )
}
