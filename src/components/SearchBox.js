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

  return (
      <div>
        <input onChange={updateState} type="text" className="input" ref={inputRef} placeholder="Add a place or an address"></input>
      {/* <i className="fa fa-map-marker fa-3x"></i> */}
      {
        inputState !== "" &&  <SearchResult input={inputState} state={props.state} dispatch={props.dispatch}  google={window.google} />
      }
      </div>
  );
  
}