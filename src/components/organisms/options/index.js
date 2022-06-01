import React from "react"
import "./style.css"
import CheckBoxList from "../../molecules/checkBoxList"
import RadioList from "../../molecules/radioList"
import DualRange from "../../molecules/dualRange"


// Options React JSX
export default function Options(props) {

    const genres = ["居酒屋", "ダイニングバー・バル", "創作料理", "和食", 
        "洋食", "イタリアン・フレンチ", "中華", 
        "焼肉・ホルモン", "韓国料理" ,"アジア・エスニック料理", "各国料理", 
        "カラオケ・パーティ", "バー・カクテル", "ラーメン", "お好み焼き・もんじゃ", "カフェ・スイーツ", 
        "その他グルメ"];
    
    const genresCode = ["G001", "G002", "G003", "G004", 
        "G005", "G006", "G007", "G008", 
        "G017", "G009", "G010", "G011", 
        "G012", "G013", "G016", "G014", 
        "G015"];

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

    const updateGenre = (index, value) => {
        let newGenreSet = new Set(props.genreSet);
        /*
        if (value == 1) { 
            genres[index]のチェックボックスにチェックが入った。 
        } else if (value == 0) {
            genres[index]のチェックボックスのチェックが外れた。
        }
        */
        if (value) {
            newGenreSet.add(genresCode[index]);
        } else {
            newGenreSet.delete(genresCode[index]);
        }
        props.updateOptions({genreSet: newGenreSet});
    }


    return(
        <div id="option-container">
            <div id="option-container-list">
                <div className="detail-option-list">
                    <DualRange
                        title="価格帯"
                        lower_name="budget_lower"
                        upper_name="budget_upper"
                        value_head="¥"
                        values={[0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 10000, 15000, 20000, 30000, 99999]}
                        handleChange={(e)=>{props.handleChange({name: e.name, value: e.value})}}
                    />
                    <CheckBoxList 
                        title="食べ放題・飲み放題"
                        options={[
                            {name: "free_food", label: "食べ放題あり"},
                            {name: "free_drink", label: "飲み放題あり"},
                        ]}
                        onChange={(e)=>{props.handleChange({name: e.name, value: e.isChecked})}}
                    />
                    <CheckBoxList 
                        title="ジャンルから選ぶ（２つまで）"
                        options={
                            genreCodeHash.map((c) => {return {name: c.code, label: c.label}})
                        }
                        onChange={(e)=>{props.handleChange({name: e.name, value: e.isChecked})}}
                    />
                    <CheckBoxList 
                        title="その他オプション"
                        options={[
                            {name: "wifi", label: "Wi-Fiあり"},
                            {name: "card", label: "カードが使える"},
                            {name: "wine", label: "ワイン充実"},
                            {name: "nihonsyu", label: "日本酒充実"},
                        ]}
                        onChange={(e)=>{props.handleChange({name: e.name, value: e.isChecked})}}
                    />
                    <RadioList
                        title="検索モード"
                        radio_name="sort-mode"
                        list_name="order"
                        options={[
                            {label: "オススメのお店を優先", option_id: 4},
                            {label: "距離が近いお店を優先", option_id: 1},
                        ]}
                        onChange={(e)=>{console.log(e)}}
                    />
                    <br/><br/><br/>
                </div>

            </div>
        </div>
    )
}