import Card from './Card'
import React from 'react'
import style from '../styles/Home.module.css'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import NavBar from './NavBar';

export default function Home ({array,dataLength,next,hasMore}){
    return(
<div>
    <NavBar/>
    {array && array.length > 0 ? 
    <InfiniteScroll
    dataLength={dataLength.length}
    next={next}
    hasMore={hasMore}
    scrollThreshold={1}
    loader={<h4>Loading...</h4>}
    className={style.Cards}
    >
    {array.map((hero)=>{
        return(
            <div  key={hero.id}>
                <Link className={style.Box} to={`/character/${hero.id}`}>
                <Card
                comics = {hero.comics.items.length}
                name = {hero.name}
                image = {`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                />
                </Link>
            </div>
        )
    })}
    </InfiniteScroll>
    :
    <Loading/>}
</div>
    )

}

//`https://gateway.marvel.com/v1/public/characters/${hero.id}?ts=1&apikey=fe17a323735b204af39980cf98d3cc2b&hash=95c89371b5df814bf30876b9a108be11`