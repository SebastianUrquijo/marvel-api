import React from "react"
import style from '../styles/Loading.module.css'
import GIF from '../pictures/giphy.gif'

export default function Loading(){

return(
    <div className={style.loadBox}>
        <div >
            <img src={GIF}
            alt="loading img"
            className={style.loadImage}/>
        </div>
        <div>
            <p className={style.loadText} data-text="Loading...">Loading...</p>
        </div>
    </div>
)
}