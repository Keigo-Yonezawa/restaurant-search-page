import React from "react"
import "./style.css"
import {DataStoreContext} from "../../../context"


const Shop = (props) => {

    return(
        <li className="shop-container"> 
            <div className="shop-img-container">
                <p><img src={props.img}></img></p>
            </div>
            <h4>{props.abstract}</h4>
            <div className="shop-name-container">
                <a href={props.link} target="_blank">{props.name}</a>
            </div>
            <div className="shop-access-container">
                <h3>アクセス</h3>
                <h4>{props.access}</h4>
            </div>
            <div className="shop-access-container">
                <h3>営業時間</h3>
                <h4>{props.open}</h4>
            </div>
        </li>
    );
}

// Shopをリスティングしたもの
export default function Restaurants(props) {

    const {state, dispatch} = React.useContext(DataStoreContext);

    const shopList = state.shops.map((shop) => { 
        return (
            <Shop 
                name = {shop.name}
                key = {shop.id}
                img = {shop.photo.pc.l}
                access = {shop.access}
                abstract = {shop.genre.catch}
                open = {shop.open}
                link = {shop.urls.pc}
            />
        );
    });

    return(
        <nav id="g-nav">
            <div id="g-nav-list">
                <ul> {shopList} </ul>    
            </div>
        </nav>
    )
}