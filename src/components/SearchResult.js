import React, { useEffect,useRef,useState } from 'react'
import formatData from '../helperFuncs/formatData';
import mapFunc from '../services/mapFunc';
import '../components/Map'

export default function SearchResult(props) {

    var [response, setResponse] = useState([]);

    useEffect(() => {
        setResponse([]);

        var service = new props.google.maps.places.AutocompleteService();
    
    
        var request = {
            input: props.input,
            bounds: new props.google.maps.LatLngBounds({ lat: -1.9433, lng: 30.0587 }),
        }
        
        service.getQueryPredictions(request, (data) => {
            
            console.log("query runned")

            if (data !== null) {
                
                data = data.filter((arr)=>{
                    return arr.hasOwnProperty("place_id");
                })
        
                data.forEach((data) => {
                    const request = {
                        placeId: data.place_id,
                        fields: [
                            "address_components",
                            "adr_address",
                            "formatted_address",
                            "formatted_phone_number",
                            "geometry",
                            "name",
                            "photos",
                            "types",
                            "utc_offset_minutes",
                            "website",
                        ]
                    }
                    
                    const callback = (data, status) => {
                        if (status === 'OK') {
                            setResponse((state) => {
                                state.push(data);
                                return state;
                            })
                        } else {
                            console.log(`error with status ${status}`);
                        }
                    }
        
                    new props.google.maps.places.PlacesService(props.state.map).getDetails(request, callback);
        
                })
            } else {
                console.log("fetched null data")
            }
        })
    },[props.input])

    // console.log(response);

    return (
        <div style={{
            width: "400px",
            height: "400px",
            backgroundColor: "blue",
            position: "absolute",
            zIndex: 10
        }}>
            typed
        {props.input}
            {
                console.log(response)
               
            }
        </div> 
    )
}
