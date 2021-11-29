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
    store: []
  });
  var [showState, setShowState] = useState(false)

  useEffect(() => {
    
    // get datta from the database and dispatch them to initialize the reducer
    getDb(dispatch)
      .then(() => {
      console.log("returned to app.js successfully")
    }).catch(() => {
      console.log("failed to return to app.js")
    });

  }, []);

  console.log("App.js ",state)

  return (
    (window.google && state.store) ?
      (<div className="app-wrapper">
        <div id="search-box">
          <SearchBox google={window.google} state={state} dispatch={dispatch}  ></SearchBox>
        </div>
        <div id="CardMapWrapper">
          <div className="Maps">
            {/* eslint-disable-next-line no-sequences */}
            <Maps state={state} toggle={{showState,setShowState}}/>
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
  apiKey: 'AIzaSyD7sWrpN3kV89Nw-ZF77sCb-zljQao9N-w',
  LoadingContainer: LoadingContainer
})(App);
