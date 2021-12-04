import { GoogleApiWrapper } from 'google-maps-react'
import React , { useReducer, useState, useEffect } from 'react'
import '../fbconfig.js'
import mapReducer from "../redux/reducer.js"
import Maps from './Map'
import SearchBox from './SearchBox'
import Card from './Card'
import getDb from '../services/getDb'
import '../styles/App.css'


const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)

export function App() {

  //create a store
  var [state , dispatch] = useReducer(mapReducer, {
    store: [],
    map: null
  });
  var [showState, setShowState] = useState(false)

  useEffect(() => {
    
    // get datta from the database and dispatch them to initialize the reducer
    getDb(dispatch).then(console.log("returned to app.js successfully")).catch(console.log("error in getDb func"))

    // document.getElementById("show-map").addEventListener("click", (e) => {
    //   // e.target.classList().addClass("show-map")
    // })

  },[]);

  console.log("App.js ",state)

  return (
    (window.google && state.store) ?
      (<div className="app-wrapper">
        <div id="search-box">
          <SearchBox google={window.google} state={state} dispatch={dispatch}  ></SearchBox>
          <div id="show-map"><img src="Btn.svg" alt="map" ></img></div>
        </div>
        <div id="CardMapWrapper">
          <div className="Maps">
            {/* eslint-disable-next-line no-sequences */}
            <Maps state={state} dispatch={dispatch} toggle={{showState,setShowState}}/>
          </div>
          <div className="Card">
             {/* eslint-disable-next-line no-sequences */}
            <Card state={state} toggle={{showState,setShowState}}/>
          </div>
        </div>
      </div>)
    : (<div className="not-connected"><b>PLEASE</b> connect and reload...</div>)
  )
}

export default GoogleApiWrapper({
    //To be used in development mode only.
  apiKey: 'AIzaSyAFoyrFHZXOa02_wTkMInLOHJnkB5rPm1I',
  LoadingContainer: LoadingContainer
})(App);
