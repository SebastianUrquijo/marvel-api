import React from 'react'
import style from '../styles/NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import UserLogo from './UserLogo'

export default function NavBar (){

    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    const [user,setUser] =useState(JSON.parse(localStorage.getItem('userInfo')))
    console.log(user)
    function handleOut(e){
        e.preventDefault()
        setUser({
            email:"",
            password:""
          })
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
                {/* <h3 onClick={(e)=> setIsOpen(!isOpen)} id={isOpen ? style.Link2 : style.Link}>User Info</h3> */}
                <UserLogo onClick={(e)=> setIsOpen(!isOpen)} id={isOpen ? style.Link2 : style.Link}/>
            </div>
            <div className={isOpen ? style.Opened : style.Closed}>
                {user ? 
                    <div className={style.UserData}>
                    <span>First Name: {user.name}</span>
                    <span>Last name: {user.last_name}</span>
                    <span>Email: {user.email}</span>
                    <button onClick={handleOut}>Sign out</button>
                    </div>
                : 
                <div className={style.UserData}></div>}

            </div>
        </div>
    )
}