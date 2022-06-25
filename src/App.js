import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Detail from './components/Detail';
import { useEffect, useState } from 'react';


function App() {

const [array,setArray] = useState([])
const [user,setUser] = useState({})

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

async function charactersAPI(){
  try {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=100&apikey=fe17a323735b204af39980cf98d3cc2b&hash=95c89371b5df814bf30876b9a108be11`)
    const result = await response.json();
    setArray(result.data.results)
    setScrollData(result.data.results.slice(0,12))
  } catch (error) {
  console.log(error)  
  }
}


useEffect(()=>{
  charactersAPI()
},[])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/heroes' element={<Home 
        array={scrollData} dataLength={scrollData}
        next={handleOnRowsScrollEnd} hasMore={hasMoreValue}
        />}/>
        <Route path='/character/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
