import React from "react"
import "./Options.css"

// utils
const getMax = (a, b) => { if (a >= b) { return a; } else { return b; } }

const getMin = (a, b) => { if (a >= b) { return b; } else { return a; } }


// Slider Track React JSX
const SliderTrack = (props) => {
    return (
        <div 
            className="slider-track"
            style={{
                background: 
                    `linear-gradient(
                    to right, 
                    #dadae5 ${props.percent1}% 
                    , #3264fe ${props.percent1}% 
                    , #3264fe ${props.percent2}%
                    , #dadae5 ${props.percent2}%)`
            }}
        >
        </div>
    );
}

// Slider React JSX
const Slider = (props) => {

    const values = props.values;
    const indexMax = values.length - 1;

    const [indexLower, setIndexLower] = React.useState(0);
    const [indexUpper, setIndexUpper] = React.useState(indexMax);

    const handleChangeOne = (e) => {
        const index = getMin(e.target.value, indexUpper - 1);
        setIndexLower(index);
        props.handleChange({budgetLower: values[index]});
    }
    
    const handleChangeTwo = (e) => {
        const index = getMax(e.target.value, parseInt(indexLower) + 1);
        setIndexUpper(index);
        props.handleChange({budgetUpper: values[index]});
    }

    return(
        <div className="slider-container">
            <div className="slider-value">
                {values[indexLower]} ~ {values[indexUpper]}
            </div>
            <div className="input-container" >
                <SliderTrack 
                    percent1={(indexLower / indexMax) * 100}
                    percent2={(indexUpper / indexMax) * 100}
                />
                <input type="range" min="0" max={indexMax} value={indexLower} id="slider-1" onChange = {(e) => handleChangeOne(e)} />
                <input type="range" min="0" max={indexMax} value={indexUpper} id="slider-2" onChange = {(e) => handleChangeTwo(e)} />
            </div>
        </div>
        
    )
} 

// Options React JSX
export default function Options(props) {

    const genres = ["居酒屋", "ダイニングバー・バル", "創作料理", "和食", 
        "洋食", "イタリアン・フレンチ", "中華", 
        "焼肉・ホルモン", "韓国料理" ,"アジア・エスニック料理", "各国料理", 
        "カラオケ・パーティ", "バー・カクテル", "ラーメン", "お好み焼き・もんじゃ", "カフェ・スイーツ", 
        "その他グルメ"];
    
    const genresCode = ["G001", "G002", "G003", "G004", 
        "G005", "G006", "G007", "G008", 
        "G0017", "G009", "G010", "G011", 
        "G012", "G013", "G016", "G014", 
        "G015"];

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
    
    const genreCheckBoxes = genres.map((value, index) => {
        return (
            <div key={value+index}>
                <input type="checkbox" onChange={(e) => { updateGenre(index, e.target.checked); }}></input>
                <label>{value}</label>
            </div>
        );
    })

    return(
        <div id="option-container">
            <div id="option-container-list">
                <div className="detail-option-list">
                    <div className="budget-container">
                        <h3>価格帯</h3>
                        <Slider 
                            values={[0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 10000, 15000, 20000, 30000, 99999]}
                            handleChange={(optionsDiff) => {props.updateOptions(optionsDiff);}}
                        />
                    </div>
                    <div className="free-drink-food-container">
                        <h3>食べ放題・飲み放題</h3>
                        <div>
                            <input type="checkbox" onChange={(e) => { props.updateOptions({free_food: Number(e.target.checked)}); }}></input>
                            <label>食べ放題あり</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={(e) => { props.updateOptions({free_drink: Number(e.target.checked)}); }}></input>
                            <label>飲み放題あり</label>
                        </div>
                    </div>
                    <div className="genre-container">
                        <h3>ジャンルから選ぶ（２つまで）</h3>
                        {genreCheckBoxes}
                    </div>
                    <div className="other-container">
                        <h3>その他のオプション</h3>
                        <div>
                            <input type="checkbox" onChange={(e) => { props.updateOptions({wifi: Number(e.target.checked)}); }}></input>
                            <label>Wi-Fiあり</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={(e) => { props.updateOptions({card: Number(e.target.checked)}); }}></input>
                            <label>カードが使える</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={(e) => { props.updateOptions({wine: Number(e.target.checked)}); }}></input>
                            <label>ワイン充実</label>
                        </div>
                        <div>
                            <input type="checkbox" onChange={(e) => { props.updateOptions({nihonsyu: Number(e.target.checked)}); }}></input>
                            <label>日本酒充実</label>
                        </div>
                    </div>
                    <div className="sort-mode-container">
                        <h3>検索モード</h3>
                        <input type="radio" name="sort-mode" onChange={(e) => { props.updateOptions({order: 4}); }}/>
                        <label>オススメのお店を優先</label>
                        <br></br>
                        <input type="radio" name="sort-mode" onChange={(e) => { props.updateOptions({order: 1}); }}/>
                        <label>距離が近いお店を優先</label>
                    </div>
                    <br/><br/><br/>
                </div>

            </div>
        </div>
    )
}