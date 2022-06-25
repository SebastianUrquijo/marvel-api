import React from "react"
import { useState,useEffect} from "react"
import { useParams} from "react-router-dom";
import style from '../styles/Detail.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from "./Loading";
import NavBar from "./NavBar";


export default function Detail (){
const {id} = useParams()
const [single,setSingle] = useState({})
const [array,setArray] = useState([])
 

const [scrollData,setScrollData] = useState()
const [hasMoreValue, setHasMoreValue] = useState(true)

async function loadScrollData(){
  try{
    setScrollData(array.slice(0,scrollData.length + 4));
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

async function characterAPI(id){
    try {
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=fe17a323735b204af39980cf98d3cc2b&hash=95c89371b5df814bf30876b9a108be11`) 
        const result = await response.json()
        setSingle(result.data.results[0])
        setArray(result.data.results[0].comics.items)
        setScrollData(result.data.results[0].comics.items.slice(0,7))
    } catch (error) {
        console.log(error)
    }
    }
    
function assetKey(value){
    let result = value.split("/");
    return result[result.length -1]
    }

function scrollToTop(){
      window.scrollTo({
        top: 0, 
        behavior: 'auto'
      });
    };

    useEffect(()=>{
      scrollToTop()
      characterAPI(id)
    },[id])

    return(
    <div>
      <NavBar/>
    <div className={style.Container}>
    {single && Object.keys(single).length > 0 ? 
    <>
    <div className={style.InfoDiv}>
    <h1>{single.name}</h1>
    <img src={single.thumbnail ? `${single.thumbnail.path}.${single.thumbnail.extension}`: "#"} alt={`${single.name}.pic`}/>
    <h3>Descripción</h3>
    {single.description !== "" ? <p>{single.description}</p> : <p>El personaje no tiene descripción</p>}
    </div>
    <div>
    {array && array.length > 0 ? 
    <div>
    <InfiniteScroll
    dataLength={scrollData.length}
    next={handleOnRowsScrollEnd}
    hasMore={hasMoreValue}
    scrollThreshold={1}
    loader={<h4>Loading...</h4>}
    className={style.ComicsZone}
    >
            {scrollData.map((comic)=>{return(
                <div key={assetKey(comic.resourceURI)} className={style.ComicName}>
                    <p>{comic.name}</p>
                </div>
            )}) }

    </InfiniteScroll>
    </div>
        : 
        <div className={style.Null}>
        <p>El personaje no sale en Comics</p>
        </div>}
    </div>
    </>
    
    : <Loading/> }
</div>
</div>
    )

}