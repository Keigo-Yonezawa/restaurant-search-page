import React from "react"
import "./style.css"
import Radio from "../../atoms/radio"
import {RADIO_EVENT, OPTION_NAME_NUM} from "../../../types"

type OPTION = {label: string, option_id: number};

type PROPS = {
    title: string,
    name: OPTION_NAME_NUM,
    options: Array<OPTION>,
    onChange: (e: RADIO_EVENT) => any
    //{(e: RADIO_EVENT)=>{handleNumChange({name: "order", value: e.option_id})}}
}

const RadioList = (props: PROPS) => {

    const radio_list = props.options.map((option)=>{
        return(
            <Radio
                key={option.label}
                name={props.name}
                id={option.option_id}
                label={option.label}
                onChange={(id)=>{ props.onChange({name: props.name, option_id: id}) }}
            />
        )
    })

    return(
        <div className="sort-mode-container">
            <h3>{props.title}</h3>
            {radio_list}
        </div>
    )
}

export default RadioList