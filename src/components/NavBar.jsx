import React from 'react'
import style from '../styles/NavBar.module.css'
import { Link } from 'react-router-dom'

export default function NavBar (){
    return (
        <div className={style.NavBar}>
            <div className={style.Text}>
                <Link to="/heroes" id={style.Link}>
                <h2>Home</h2>
                </Link>
                
            </div>
            <div className={style.Text}>
                <h3>User Info</h3>
            </div>
        </div>
    )
}