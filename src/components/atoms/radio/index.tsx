import React from "react"
import { OPTION_NAME_NUM } from "../../../types"
import "./style.css"

type PROPS = {
    name: OPTION_NAME_NUM,
    id: number,
    label: string,
    onChange: (id: number) => any,
}

const Radio = (props: PROPS) => {

    return(
        <div>
            <input type="radio" name={props.name} onChange={(e) => { props.onChange(props.id); }}/>
            <label>{props.label}</label>
        </div>
    )
}

export default Radio