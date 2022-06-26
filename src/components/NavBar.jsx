import React from 'react'
import style from '../styles/NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function NavBar (){

    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem('userInfo'));
    const [isOpen,setIsOpen] = useState(false)


    function handleOut(e){
        e.preventDefault()
        window.localStorage.clear();
        navigate("/",{replace:true})
    }

    return (
        <div className={style.NavBar}>
            <div className={style.Text}>
                <Link to="/heroes" id={style.Link}>
                HOME
                </Link>
            </div>
            <div className={style.Text}>
                <h3 onClick={(e)=> setIsOpen(!isOpen)} id={isOpen ? style.Link2 : style.Link}>User Info</h3>
            </div>
            <div className={isOpen ? style.Opened : style.Closed}>
                {data ? 
                    <div className={style.UserData}>
                    <span>Email: {data.email}</span>
                    <button onClick={handleOut}>Sign out</button>
                    </div>
                : 
                <div className={style.UserData}></div>}

            </div>
        </div>
    )
}