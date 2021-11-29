import React from 'react'
import '../styles/Card.css'

export default function Card(props) {
    return (
        <div >
            {
                props.state && props.state.store.length !== 0 &&
                (
                    props.state.store.map((data , index) => {
                        return (
                            <div className="card-container" key={index}>
                                <img src={data.photo} alt={data.name}></img>
                                <div className="inner-return-wrapper">
                                    <p className="card-p">{data.name}</p>
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
