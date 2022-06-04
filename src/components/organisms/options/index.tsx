import React from "react"
import "./style.css"
import CheckBoxList from "../../molecules/checkBoxList"
import CheckBoxSet from "../../molecules/checkBoxSet"
import RadioList from "../../molecules/radioList"
import DualRange from "../../molecules/dualRange"
import {DataStoreContext} from "../../../context"
import {GENRE_CODE_HASH} from "../../../utils/param"
import {CHECK_EVENT, RADIO_EVENT, DUAL_RANGE_EVENT, GENRE_EVENT, OPTION_NAME_NUM, OPTION_NAME_BOOL, GENRE_CODE} from "../../../types"


// Options React JSX
export default function Options() {

    const {state, dispatch} = React.useContext(DataStoreContext);

    const handleBoolChange = (e: {name: OPTION_NAME_BOOL, value: boolean}) => {
        dispatch({type: "UPDATE_OPTION_BOOL", name: e.name, value: e.value});
    }

    const handleNumChange = (e: {name: OPTION_NAME_NUM, value: number}) => {
        dispatch({type: "UPDATE_OPTION_NUM", name: e.name, value: e.value});
    }

    const handleGenreChange = (e: {name: GENRE_CODE, value: boolean}) => {
        dispatch({type: "UPDATE_GENRE_SET", name: e.name, value: e.value});
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
                        value_tail=""
                        values={[0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 10000, 15000, 20000, 30000, 99999]}
                        handleChange={(e: DUAL_RANGE_EVENT)=>{handleNumChange({name: e.name, value: e.value})}}
                    />
                    <CheckBoxList 
                        title="食べ放題・飲み放題"
                        options={[
                            {name: "free_food", label: "食べ放題あり"},
                            {name: "free_drink", label: "飲み放題あり"},
                        ]}
                        onChange={(e: CHECK_EVENT)=>{handleBoolChange({name: e.name, value: e.isChecked})}}
                    />
                    <CheckBoxSet 
                        title="ジャンルから選ぶ（２つまで）"
                        options={
                            GENRE_CODE_HASH.map((c) => {return {name: c.code as GENRE_CODE, label: c.label as string}})
                        }
                        onChange={(e: GENRE_EVENT)=>{handleGenreChange({name: e.name, value: e.isChecked})}}
                    />
                    <CheckBoxList 
                        title="その他オプション"
                        options={[
                            {name: "wifi", label: "Wi-Fiあり"},
                            {name: "card", label: "カードが使える"},
                            {name: "wine", label: "ワイン充実"},
                            {name: "nihonsyu", label: "日本酒充実"},
                        ]}
                        onChange={(e: CHECK_EVENT)=>{handleBoolChange({name: e.name, value: e.isChecked})}}
                    />
                    <RadioList
                        title="検索モード"
                        name="order"
                        options={[
                            {label: "オススメのお店を優先", option_id: 4},
                            {label: "距離が近いお店を優先", option_id: 1},
                        ]}
                        onChange={(e: RADIO_EVENT)=>{handleNumChange({name: e.name, value: e.option_id})}}
                    />
                    <br/><br/><br/>
                </div>
            </div>
        </div>
    )
}