import React from 'react'
import '../styles/Card.css'

export default function Card({state}) {
    return (
        <div className={state.toogleView ? null : "outter-card-container"} >
            {
                state && state.store.length !== 0 &&
                (
                    state.store.map((data , index) => {
                        return (
                            <div 
                                className={ state.toogleView ? "card-container-s" : "card-container-l" } 
                                key={index}
                            >
                                <img 
                                    className={ state.toogleView ? "img-s" : "img-l"} 
                                    src={data.photo} alt={data.name}
                                ></img>
                                <div className={state.toogleView ? "card-wrapper-s":"card-wrapper-l"}>
                                    <p 
                                        className={ state.toogleView ? "card-p-s" : "card-p-l"}
                                    >{data.name}</p>
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
