import React, { useEffect,useRef,useState } from 'react'

export default function SearchResult(props) {

    var [response, setResponse] = useState("no change");
    var service = new props.google.maps.places.AutocompleteService();

    useEffect(() => {

        var request = {
            input: props.input,
            bounds: new props.google.maps.LatLngBounds({ lat: -1.9433, lng: 30.0587 }),
        }
        
        service.getQueryPredictions(request, (data) => {
            data = data.filter((arr)=>{
                return arr.hasOwnProperty("place_id");
            })

            setResponse(() => data[0].description)
            
            console.log(data)
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
