import React from "react"
import "./style.css"
import CheckBox from "../../atoms/checkBox"

const CheckBoxList = (props) => {

    const check_boxes = props.options.map((option)=>{
        return(
            <CheckBox
                label={option.label}
                name={option.name}
                key={option.name}
                onChange={({name: name, isChecked: isChecked}) => { props.onChange({name: name, isChecked: isChecked}); }}
            />
        )
    })

    return(
        <div className="check-box-list-container">
            <h3>{props.title}</h3>
            {check_boxes}
        </div>
    )
}

export default CheckBoxList