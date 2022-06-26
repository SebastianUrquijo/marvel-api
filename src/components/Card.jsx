import React from "react"
import style from '../styles/Card.module.css'


export default function Card ({comics,name,image}){

function changeLink(string){
    var base = string.split("http").pop()
    var head = "https"
    return head + base
}

    return(
<div className={style.CardBox}>
    <div className={style.Name}>
        <h2>{name}</h2>
    </div>
    <img src={changeLink(image)} alt={`${name}.pic`}/>
    <h4>Participación en {comics} Comics</h4>
</div>
    )

}