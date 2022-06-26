import React,{Fragment} from 'react';
import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Detail from './components/Detail';
import PrivateUser from './components/PrivateUser';
import PrivateLogin from './components/PrivateLogin';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

const navigate = useNavigate()
const SERVER = "http://localhost:3001"

const apiKey = process.env.REACT_APP_API_KEY;
const hash = process.env.REACT_APP_HASH;

const [array,setArray] = useState([])
const [user,setUser] = useState({
  email:"",
  password:""
})

const [scrollData,setScrollData] = useState()
const [hasMoreValue, setHasMoreValue] = useState(true)


async function loadScrollData(){
  try{
    setScrollData(array.slice(0,scrollData.length + 12));
  } catch(err){
    console.log(err)
  }
}

function handleOnRowsScrollEnd (){
  if(scrollData.length < array.length){
    setHasMoreValue(true);
    loadScrollData();
  }else{
    setHasMoreValue(false)
  }
}

async function charactersAPI(apiKey,hash){
  try {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=100&apikey=${apiKey}&hash=${hash}`)
    const result = await response.json();
    setArray(result.data.results)
    setScrollData(result.data.results.slice(0,12))
  } catch (error) {
  console.log(error)  
  }
}

async function handleLogin(e){
  e.preventDefault()
  let response = null
  try {
    response = await fetch(`${SERVER}/login`,
    {method:"POST",
    headers: {
        "Content-Type": "application/json",
    },body: JSON.stringify(user)
})
  
    const result = await response.json()
    if(result){
      if(result.msg === "Login success"){
        localStorage.setItem('userInfo', JSON.stringify(user))
        setUser({
          email: "",
          password: ""
      })
      toast.success(`${result.msg}`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    navigate("/heroes",{replace:true})
      }
      else if(result.msg === "Email or Password does not match"){
        toast.error(`${result.msg}`, {
          position: toast.POSITION.BOTTOM_RIGHT
      });
      }else{
        toast.error(`${result.msg}`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  charactersAPI(apiKey,hash)
},[apiKey,hash])

  return (
    <Fragment>
      <ToastContainer/>
      <Routes>

        <Route path='/' element={
        <PrivateLogin>
        <Login user={user} setUser={setUser} handleLogin={handleLogin}/>
        </PrivateLogin>
        }/>

        <Route path='/heroes' element={
        <PrivateUser>
        <Home 
        array={scrollData} dataLength={scrollData}
        next={handleOnRowsScrollEnd} hasMore={hasMoreValue}
        />
        </PrivateUser>
        }/>
        
        <Route path='/character/:id' element={<PrivateUser><Detail/></PrivateUser>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
