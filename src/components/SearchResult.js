import React, { useCallback, useEffect,useRef,useState } from 'react'
import formatData from '../helperFuncs/formatData';
import mapFunc from '../services/mapFunc';
import '../components/Map'
import SearchResponse from './SearchResponse'

export default function SearchResult(props) {

    var [response, setResponse] = useState([]);
    var searchStatus = useRef(true);
    var currentSearch = useRef(props.input);
    var prevSearch = useRef();
    var count = useRef(0);
    var responseCollector = useRef([]);
        
        //provide current input to callback
        currentSearch.current = props.input;
    
        // function searchProvider() {
        //     return currentSearch.current;
        // }
    
        var service = new props.google.maps.places.AutocompleteService();
        
        var requestQuery = {
            input: props.input,
            bounds: new props.google.maps.LatLngBounds({ lat: -1.9433, lng: 30.0587 }),
        }
        
    
        var callbackQuery = (dataQ, status) => {
            
            prevSearch.current = props.input;

    
            if (status === 'OK') {
                
                //filter those with place_id to be used in getDetails
                dataQ = dataQ.filter((arr)=>{
                    return arr.hasOwnProperty("place_id");
                })
    
    
                count.current = 0;
                
                dataQ.forEach((dataQFor) => {
                    const requestDetails = {
                        placeId: dataQFor.place_id,
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
                    
                    const callbackDetails = (dataDetails, status) => {
                        
                        if(count.current === 0){
                            responseCollector.current = [];
                        }
                        count.current++;
                        
                        if (status === 'OK') {
                            //format the data we receive
                            dataDetails = formatData(dataDetails);
                            responseCollector.current = [...responseCollector.current, dataDetails]
                        } else {
                            console.log(`getDetails returned status: ${status}`);
                        }
    
                        //if all the seconds callbacks have returned, set status to true or get new query
                        // if new input are present
                        if (count.current === dataQ.length) {
                            setResponse(() => {
                                return responseCollector.current
                            });
                        }
                    }
        
                    new props.google.maps.places.PlacesService(props.state.map).getDetails(requestDetails, callbackDetails);
        
                })
    
            } else {
                console.log(`getQueryPredictions returned Status: ${status}`)
    
                //on error if you didn't enter a new input set status to true else search the new input
                // if (searchProvider === prevSearch.current) {
                    searchStatus.current = true;
                    
                // } else {
                //     service.getQueryPredictions(requestQuery, callbackQuery);
                // }
            }
    
        }

        useEffect(()=>{
        
        //copy the input being searched 
        if (searchStatus.current === true) {
            prevSearch.current = props.input;
        }
        //call the search for predictions
        if (searchStatus.current === true) {
            service.getQueryPredictions(requestQuery, callbackQuery);
        }
        //set the status to false to prevent other prediction before the results
        if (props.input === prevSearch.current) {
            searchStatus.current = false;
        }
    },[props.input])

    useEffect(()=>{
        if(count.current !== 0){
            if (currentSearch.current === prevSearch.current) {
                console.log("didn't repeate ...")
                searchStatus.current = true;
            } else {
                console.log(`repeated   ..... with current = ${currentSearch.current} and previous = ${prevSearch.current}`)
                service.getQueryPredictions(requestQuery, callbackQuery);
            }
        }
    },[response])


    return (
        <div style={{
            width: "400px",
            height: "400px",
            backgroundColor: "blue",
            position: "absolute",
            zIndex: 10
        }}>
            
            {response[0] && response.map((response,index) => { return <SearchResponse response={response} dispatch={props.dispatch} index={index} state={props.state} /> })}

        </div>
        
    )
}
