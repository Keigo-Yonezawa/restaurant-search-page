import React from "react"
import axios from "axios"
import qs from "qs"
import { MapContainer, TileLayer, Marker, Tooltip, Circle} from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import "./style.css"
import 'leaflet/dist/leaflet.css'
import {DataStoreContext} from "../../../context"

// add icons
import Leaflet, { setOptions } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// marker setting
let DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

// axiosのインスタンス作成
const myAPI = axios.create ({
    baseURL: 'https://fathomless-wave-02848.herokuapp.com/hotpepper/'
})

// herokuにデプロイした自作APIを叩く
const fetchSearchData = async(params) => {
    return await myAPI.get('', {
        params: params,
        paramsSerializer: (params) => {
            return qs.stringify(params, {arrayFormat: 'repeat'});
        }
    })
}


export default function Map(props) {

    const {state, dispatch} = React.useContext(DataStoreContext);

    const radiusFixer = 200;
    const [searchCenter, setSearchCenter] = React.useState([35.6976637865, 139.6971233896]);
    const [searchRadius, setSearchRadius] = React.useState(2000 + radiusFixer);

    // c = {lat: , lng: }
    // c を中心に指定した範囲だけ飲食店を探し，検索結果をshopsにセット。
    const searchRestaurants = (c) => {

        const params = {
            ...state.option,
            genre: Array.from(state.option.genreSet),
            lat: c.lat,
            lng: c.lng,
        }

        fetchSearchData(params).then((res) => { 
            //setShops(res["data"]);
            dispatch({type: "UPDATE_SHOPS", shops: res["data"]})
            dispatch({type: "SEARCHING_END"})
        })
    }

    const calcRadiusFromZoom = (zoom) => {
        let radius;
        switch (zoom) {
            case 13:
                radius = 2000;
                break;
            case 14:
                radius = 1000;
                break;
            case 15:
                radius = 500;
                break;
            case 16 || 17 || 18:
                radius = 300;
                break;
            default:
                radius = 3000;
                break;
        }
        return radius + radiusFixer;
    }

    // zoom → rangeの関係
    // * when (zoom <= 13) : range = 5（max）
    // * when (13 <= zoom <= 17) : 1 <= range <= 5 (1ずつ変化)
    // * when (zoom == 18) : range = 1 (min)
    const calcRangeFromZoom = (zoom) => {

        let range;
        if (zoom < 13) {
            range = 5;
        } else {
            range = 17 - zoom;
        }

        if (range <= 0) {
            range = 1;
        }

        return range;
    }

    const EventHandler = () => {
        const map = useMapEvents({
            click: (e) => {
                //props.handleClick(e.latlng);
                dispatch({type: "SEARCHING_BEGIN"});
                searchRestaurants(e.latlng);
                setSearchCenter([e.latlng.lat, e.latlng.lng])
            },
            zoomend: (e) => {
                setSearchRadius(calcRadiusFromZoom(e.target._zoom));
                dispatch({type: "UPDATE_OPTION", name: "range", value: calcRangeFromZoom(e.target._zoom)})
            }
        })
        return null;
    }

    const SearchingCircle = () => {
        return state.isSearching ? 
        (
            <Circle 
                center={searchCenter}
                radius={searchRadius}
                color={"rgba(0,0,0,0)"}
                fillColor={"#399ade"}
                fillOpacity={0.5}
            />
        ) :
        (
            <Circle 
                center={searchCenter}
                radius={searchRadius}
                color={"rgba(0,0,0,0)"}
                fillColor={"#399ade"}
                fillOpacity={0}
            />
        )
    }

    const Markers = state.shops.map((shop) => {
        return(
            <Marker 
                position={[shop.lat, shop.lng]}
                bounceOnAdd={true}
                key={shop.id}
            >
                <Tooltip>{shop.name}</Tooltip>
            </Marker>
        );
    });

    return (
        <MapContainer 
            center={[35.6976637865, 139.6971233896]} 
            zoom={13}
            maxZoom={17}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <EventHandler />
            {Markers}
            <SearchingCircle />

        </MapContainer>
    )
};