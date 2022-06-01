import React from "react"
import "./style.css"
import Radio from "../../atoms/radio"

const RadioList = (props) => {

    const radio_list = props.options.map((option)=>{
        return(
            <Radio
                radio_name={props.radio_name}
                id={option.option_id}
                label={option.label}
                key={option.label}
                onChange={(id)=>{ props.onChange({list_name: props.list_name, option_id: id}) }}
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