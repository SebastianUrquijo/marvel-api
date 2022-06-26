import style from '../styles/Login.module.css'
import UserLogo from './UserLogo'

export default function Login ({user,setUser,handleLogin}){


function onChange(e){
    setUser({...user,[e.target.name]:e.target.value})
}

    return(
        <div className={style.Back}>
            <div className={style.LoginBox}>
                <UserLogo id={style.User}/>
                <p>MARVEL COMICS</p>
                <form onSubmit={handleLogin}>
                    <input type="email" name ="email" value={user.value} onChange={onChange} placeholder='User email...'/>
                    <input type="password" name="password" value={user.password} onChange={onChange} placeholder='Password...'/>
                    <button type="submit" onSubmit={handleLogin}>Submit</button>
                </form>
            </div>
        </div>
    )

}