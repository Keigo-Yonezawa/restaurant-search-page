import React from "react"
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle, Pane} from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import "./Map.css"
import 'leaflet/dist/leaflet.css'

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


export default function Map(props) {

    const radiusFixer = 200;
    const shops = props.shops;
    const isSearching = props.isSearching;
    const [searchCenter, setSearchCenter] = React.useState([35.6976637865, 139.6971233896]);
    const [searchRadius, setSearchRadius] = React.useState(2000 + radiusFixer);

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

    const MyComponent = () => {
        const map = useMapEvents({
            click: (e) => {
                props.handleClick(e.latlng);
                setSearchCenter([e.latlng.lat, e.latlng.lng])
            },
            zoomend: (e) => {
                props.handleZoomChange(e.target._zoom);
                setSearchRadius(calcRadiusFromZoom(e.target._zoom));
            }
        })
        return null;
    }

    const SearchingCircle = () => {
        return isSearching ? (
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

    const Markers = shops.map((shop) => {
        return(
            <Marker 
                position={[shop.lat, shop.lng]}
                bounceOnAdd={true}
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
            <MyComponent />
            {Markers}
            <SearchingCircle />

        </MapContainer>
    )
};