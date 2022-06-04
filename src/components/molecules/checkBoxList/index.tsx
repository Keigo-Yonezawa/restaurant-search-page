import React from "react"
import "./style.css"
import CheckBox from "../../atoms/checkBox_option"
import { CHECK_EVENT, GENRE_CODE, GENRE_EVENT, OPTION_NAME_BOOL} from "../../../types"

type PROPS = {
    title: string,
    options: Array<{name: OPTION_NAME_BOOL, label: string}>
    onChange: (e: CHECK_EVENT) => void,
}


const CheckBoxList = (props: PROPS) => {

    const check_boxes = props.options.map((option: {name: OPTION_NAME_BOOL, label: string})=>{
        return(
            <CheckBox
                key={option.name}
                label={option.label}
                name={option.name}
                onChange={(e: CHECK_EVENT) => { props.onChange({name: e.name, isChecked: e.isChecked}); }}
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