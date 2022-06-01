import React from "react"
import "./style.css"

const CheckBox = (props) => {
    return(
        <div className="check-box-container">
            <input type="checkbox" onChange={(e) => { props.onChange({name: props.name, isChecked: e.target.checked}); }}></input>
            <label>{props.label}</label>
        </div>
    )
}

export default CheckBox