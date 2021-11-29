import React, { useEffect,useRef,useState } from 'react'

export default function SearchResult(props) {

    var [response, setResponse] = useState("no change");
    var service = new props.google.maps.places.AutocompleteService();

    useEffect(() => {

        var request = {
            input: props.input,
            bounds: new props.google.maps.LatLngBounds({ lat: -1.9433, lng: 30.0587 }),
        }
        
        service.getPlacePredictions(request).then(({predictions}) => {
            setResponse(predictions[0].description)
            console.log(predictions)
        })
        
    })
    console.log("searchResult inputState", props.input);
    
    console.log(response)

    return (
        <div style={{
            width: "400px",
            height: "400px",
            backgroundColor: "blue",
            position: "absolute",
            zIndex: 10
            }}>
                {response}
        </div> 
    )
}
