import React from "react"
import "./style.css"
import CheckBoxList from "../../molecules/checkBoxList"
import RadioList from "../../molecules/radioList"
import DualRange from "../../molecules/dualRange"
import {DataStoreContext} from "../../../context"

const genreCodeHash = [
    {code: "G001", label: "居酒屋"},
    {code: "G002", label: "ダイニングバー・バル"},
    {code: "G003", label: "創作料理"},
    {code: "G004", label: "和食"},
    {code: "G005", label: "洋食"},
    {code: "G006", label: "イタリアン・フレンチ"},
    {code: "G007", label: "中華"},
    {code: "G008", label: "焼肉・ホルモン"},
    {code: "G017", label: "韓国料理"},
    {code: "G009", label: "アジア・エスニック料理"},
    {code: "G010", label: "各国料理"},
    {code: "G011", label: "カラオケ・パーティ"},
    {code: "G012", label: "バー・カクテル"},
    {code: "G013", label: "ラーメン"},
    {code: "G016", label: "お好み焼き・もんじゃ"},
    {code: "G014", label: "カフェ・スイーツ"},
    {code: "G015", label: "その他グルメ"},
]


// Options React JSX
export default function Options() {

    const {state, dispatch} = React.useContext(DataStoreContext);

    const handleChange = ({name, value}) => {
        dispatch({type: "UPDATE_OPTION", name: name, value: value});
    }

    const handleGenreChange = ({name, value}) => {
        dispatch({type: "UPDATE_GENRE_SET", name: name, value: value});
    }


    return(
        <div id="option-container">
            <div id="option-container-list">
                <div className="detail-option-list">
                    <DualRange
                        title="価格帯"
                        lower_name="budgetLower"
                        upper_name="budgetUpper"
                        value_head="¥"
                        values={[0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 10000, 15000, 20000, 30000, 99999]}
                        handleChange={(e)=>{handleChange({name: e.name, value: e.value})}}
                    />
                    <CheckBoxList 
                        title="食べ放題・飲み放題"
                        options={[
                            {name: "free_food", label: "食べ放題あり"},
                            {name: "free_drink", label: "飲み放題あり"},
                        ]}
                        onChange={(e)=>{handleChange({name: e.name, value: e.isChecked})}}
                    />
                    <CheckBoxList 
                        title="ジャンルから選ぶ（２つまで）"
                        options={
                            genreCodeHash.map((c) => {return {name: c.code, label: c.label}})
                        }
                        onChange={(e)=>{handleGenreChange({name: e.name, value: e.isChecked})}}
                    />
                    <CheckBoxList 
                        title="その他オプション"
                        options={[
                            {name: "wifi", label: "Wi-Fiあり"},
                            {name: "card", label: "カードが使える"},
                            {name: "wine", label: "ワイン充実"},
                            {name: "nihonsyu", label: "日本酒充実"},
                        ]}
                        onChange={(e)=>{handleChange({name: e.name, value: e.isChecked})}}
                    />
                    <RadioList
                        title="検索モード"
                        radio_name="sort-mode"
                        options={[
                            {label: "オススメのお店を優先", option_id: 4},
                            {label: "距離が近いお店を優先", option_id: 1},
                        ]}
                        onChange={(e)=>{handleChange({name: "order", value: e.option_id})}}
                    />
                    <br/><br/><br/>
                </div>

            </div>
        </div>
    )
}