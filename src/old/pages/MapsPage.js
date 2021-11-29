import React, { Component } from 'react'
import SearchBox from '../components/SearchBox'
import Map from "../components/Map"
import "../assets/styles/map.css"

export class mapsPage extends Component {
    render() {
        return (
            <div>
                <SearchBox/>
                <Map className= "mapspage" />
            </div>
        )
    }
}

export default mapsPage
