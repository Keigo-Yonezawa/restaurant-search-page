import React from "react"
import "./style.css"

const Radio = (props) => {

    return(
        <div>
            <input type="radio" name={props.radio_name} onChange={(e) => { props.onChange(props.id); }}/>
            <label>{props.label}</label>
        </div>
    )
}

export default Radio