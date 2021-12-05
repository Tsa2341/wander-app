import React, {
  useState
} from 'react';
import '../fbconfig.js';
import '../styles/SearchBox.css';
import SearchResult from './SearchResult.js';




export default function SearchBox(props) {

  var [inputState, setInputState] = useState("");

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
            //change the input state on every type
            onChange={(e)=>{ setInputState(() => e.target.value )}}
            type="text" className="input"
            placeholder="Add a place or an address"
          ></input>
        </div>
        {
          //display the predictions if their is input
          inputState !== "" &&  <SearchResult input={inputState} state={props.state} dispatch={props.dispatch}  google={window.google} />
        }
      </div>
  );
  
}