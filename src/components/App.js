import { GoogleApiWrapper } from 'google-maps-react'
import React, { useEffect, useReducer } from 'react'
import '../fbconfig.js'
import mapReducer from "../redux/reducer.js"
import getDb from '../services/getDb'
import '../styles/App.css'
import Card from './Card'
import Maps from './Map'
import SearchBox from './SearchBox'


const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)

export function App() {

  //create a store
  var [state , dispatch] = useReducer(mapReducer, {
    store: [],
    map: null,
    toogleView: true,
  });

  // get datta from the database and dispatch them to initialize the reducer
  useEffect(() => {
    getDb(dispatch).then(console.log("returned to app.js successfully")).catch((error)=> console.log(error))
  },[])
  
  useEffect(()=>{
    const showMapBtn =  document.getElementById("show-map-btn")
    if(showMapBtn){
      showMapBtn.addEventListener('click',(e)=>{
        dispatch({
          type : 'TOOGLE',
          payload: true
        })
      })
  
      return ()=>{
        showMapBtn.removeEventListener('click',(e)=>{
          dispatch({
            type : 'TOOGLE',
            payload: true
          })
        })
      }
    }

  },[state.toogleView]);

  console.log("App.js ",state)
  console.log(window.google)

  return (
    (window.google && state.store) ?
      (<div className="app-wrapper">
        <div id="search-box">

          <SearchBox google={window.google} state={state} dispatch={dispatch}  ></SearchBox>
          { 
            !state.toogleView && <div 
              id="show-map-btn" 
              class="show-map-btn"
              >
                <img src="Btn.svg" alt="map" ></img>
            </div>
          }

        </div>
        <div id="CardMapWrapper">
          
          { state.toogleView && 
            <div className="Maps">

              {/* eslint-disable-next-line no-sequences */}
              <Maps state={state} dispatch={dispatch}/>

            </div>
          } 
          
          <div className={state.toogleView ? "Card-s": "Card-l"}>

             {/* eslint-disable-next-line no-sequences */}
            <Card state={state}/>

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
