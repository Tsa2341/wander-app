import React, { useEffect, useRef, useState } from 'react';
import formatData from '../helperFuncs/formatData';
import '../styles/SearchResult.css';
import SearchResponse from './SearchResponse';

export default function SearchResult(props) {

    var [response, setResponse] = useState([]);
    var searchStatus = useRef(true);
    var currentSearch = useRef(props.input);
    var prevSearch = useRef();
    var count = useRef(0);
    var responseCollector = useRef([]);
    
    //creating a functionality of sending a query for prediction and details only if
    //the previous have returned

    //provide current input to callback
    currentSearch.current = props.input;

    //initialize the autocomplete service
    var service = new props.google.maps.places.AutocompleteService();
    
    //request and callback for the getQueryPredictions
    var requestQuery = {
        input: props.input,
        bounds: new props.google.maps.LatLngBounds({ lat: -1.9433, lng: 30.0587 }),
    }

    var callbackQuery = (dataQ, status) => {
        
        //set the input on callback initialization
        prevSearch.current = props.input;


        if (status === 'OK') {
            
            //filter those with place_id to be used in getDetails
            dataQ = dataQ.filter((arr)=>{
                return arr.hasOwnProperty("place_id");
            })

            //reset he count
            count.current = 0;
            
            //iterate through the returned predictions and call the getDetails
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

                    //increment the count for each callBack returned
                    count.current++;
                    
                    if (status === 'OK') {
                        //format the data we receive
                        dataDetails = formatData(dataDetails);
                        responseCollector.current = [...responseCollector.current, dataDetails]
                    } else {
                        console.log(`getDetails returned status: ${status}`);
                    }

                    //if all the getDetails callbacks have returned, update the response with the new data
                    if (count.current === dataQ.length) {
                        setResponse(() => {
                            return responseCollector.current
                        });
                    }
                }
    
                new props.google.maps.places.PlacesService(props.state.map).getDetails(requestDetails, callbackDetails);
    
            })

        } else {

            //on error set status to true to allow next query
            console.log(`getQueryPredictions returned Status: ${status}`)
            searchStatus.current = true;
        }

    }


    //make this only run at initialization and input change
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

    //make this run only on initialization and if response changed
    useEffect(()=>{

        //if all getDetails callback have returned
        if(count.current !== 0){
            //and the current and previous search are equal allow the next query to be sent
            if (currentSearch.current === prevSearch.current) {
                console.log("didn't repeate ...")
                searchStatus.current = true;
            } else {
                //else if the input have changed call the getQueryPredictions with the new input
                console.log(`repeated   ..... with current = ${currentSearch.current} and previous = ${prevSearch.current}`)
                service.getQueryPredictions(requestQuery, callbackQuery);
            }
        }
    },[response])


    return (
        <div className="result-wrapper">
            {response[0] && response.map((response,index) => { return <SearchResponse response={response} dispatch={props.dispatch} index={index} state={props.state} /> })}
        </div>
    )
}
