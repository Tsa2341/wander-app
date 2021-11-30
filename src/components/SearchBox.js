import { GoogleApiWrapper } from 'google-maps-react';
import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import '../fbconfig.js';
import formatData from '../helperFuncs/formatData.js';
import '../styles/SearchBox.css';
import SearchResult from './SearchResult.js';




export default function SearchBox(props) {

  var [inputState, setInputState] = useState("");
  var inputRef = useRef();

  function updateState(e) {
    setInputState(() => {
      return e.target.value;
    })
  };

  // useEffect(() => {

  //   //creating the searchBox instance
  //   // var defaultBounds = new props.google.maps.LatLngBounds(
  //   //   new props.google.maps.LatLng(-33.8902, 151.1759),
  //   //   new props.google.maps.LatLng(-33.8474, 151.2631)
  //   // );

  //   var fields = [
  //     'formatted_phone_number',
  //     'name', 'utc_offset_minutes',
  //     'formatted_address',
  //     'formatted_phone_number',
  //     'photos',
  //     'geometry.location','url'
  //   ]

  //   //create the searchBox
  //   var searchBox = new props.google.maps.places.Autocomplete(inputEl.current, {
  //     // bounds: defaultBounds,
  //     fields: fields,
  //   });


  //   //adding listener to listen on places changed
  //   searchBox.addListener('place_changed', () => {

  //     //call the formatting fuction to receive data in our desired way
  //     const data = formatData(searchBox.getPlace());


  //     console.log("searchBox data",data);


  //     //updating the props.state
  //     props.dispatch({
  //       type: "ADD",
  //       payload: [data]
  //     })

  //     console.log("searchBox state",props.state)
  //   })

    

  // },[props]);

  return (
      <div>
        <input onChange={updateState} type="text" className="input" ref={inputRef} placeholder="Add a place or an address"></input>
      {/* <i className="fa fa-map-marker fa-3x"></i> */}
      {
        inputState !== "" &&  <SearchResult input={inputState} state={props.state}  google={window.google} />
      }
      </div>
  );
  
}