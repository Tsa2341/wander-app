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

  // useEffect(()=>{
  //   var inputEl = document.getElementById("input");
  //   inputEl.addEventListener('mouseout',()=>{
  //     inputEl.parentNode.childNodes[1].addAttribute('class','hide')
  //   })
  // },[])


  return (
      <div className="form-wrapper">
        <div className="input-wrapper">
          <img className="input-img" src="locationmarker.svg" alt="marker icon"></img>
          <input
            id="input"
            onChange={(e)=>{ setInputState(() => e.target.value )}}
            type="text" className="input" 
            ref={inputRef} 
            placeholder="Add a place or an address"
          ></input>
        </div>
        {
          inputState !== "" &&  <SearchResult input={inputState} state={props.state} dispatch={props.dispatch}  google={window.google} />
        }
      </div>
  );
  
}