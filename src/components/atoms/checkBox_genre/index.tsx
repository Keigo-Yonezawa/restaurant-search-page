import React from "react"
import { CHECK_EVENT, GENRE_CODE, GENRE_EVENT, OPTION_NAME, OPTION_NAME_BOOL } from "../../../types"
import "./style.css"


type PROPS = {
    label: string,
    name: GENRE_CODE,
    onChange: (e: GENRE_EVENT) => any,
}

const CheckBoxGenre = (props: PROPS) => {

    return(
        <div className="check-box-container">
            <input type="checkbox" onChange={(e) => { props.onChange({name: props.name, isChecked: e.target.checked}); }}></input>
            <label>{props.label}</label>
        </div>
    )
}

export default CheckBoxGenre