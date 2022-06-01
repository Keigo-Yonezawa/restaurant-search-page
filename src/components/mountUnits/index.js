import React from "react"
import axios from "axios"
import qs from "qs"
import './style.css'
import Restaurants from "../organisms/restaurants"
import Map from "../organisms/map"
import Options from "../organisms/options"


function App() {

  // shop 配列
  const [shops, setShops] = React.useState([]);

  // 検索中フラグ
  const [isSearching, setIsSearching] = React.useState(false)

  // 検索option
  const [options, setOptions] = React.useState({
    wifi: 0,
    card: 0,
    wine: 0,
    nihonsyu: 0,
    free_drink: 0,
    free_food: 0,
    budgetLower: 0,
    budgetUpper: 99999,
    genreSet: new Set(),
    order: 4,
    range: 4,
  });

  // 検索optionsをupdate
  // optionsの差分オブジェクト（例: {wifi: 0, wine: 1}）を受け取り，その部分を更新。
  const updateOptions = (optionsDiff) => {
    let newOptions =  { ...options};
    for (let key in optionsDiff) {
      newOptions[key] = optionsDiff[key];
    }
    setOptions(newOptions);
    console.log(newOptions);
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

  // c = {lat: , lng: }
  // c を中心に指定した範囲だけ飲食店を探し，検索結果をshopsにセット。
  const searchRestaurants = (c) => {

    const params = {
      ...options,
      genre: Array.from(options.genreSet),
      lat: c.lat,
      lng: c.lng,
    }

    fetchSearchData(params).then((res) => { 
      setShops(res["data"]);
      console.log(res);
      setIsSearching(false); // 検索中モードOFF
    })
  }

  return (
      <div className="app-container">
        <Restaurants 
          shops = {shops}
        />
        <Map 
          handleClick = {(c) => {
            setIsSearching(true); 
            searchRestaurants(c);
          }}
          handleZoomChange = {(zoom) => {updateOptions({range: calcRangeFromZoom(zoom)})}}
          shops = {shops}
          isSearching = {isSearching}
        />
        <Options
          genreSet = {options.genreSet}
          updateOptions = {(optionsDiff) => updateOptions(optionsDiff)}
          handleChange = {(e) => {console.log(e);}}
        />
      </div>
  );
}

export default App;