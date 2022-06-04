import React from "react"
import "./style.css"
import CheckBox from "../../atoms/checkBox_genre"
import { CHECK_EVENT, GENRE_CODE, GENRE_EVENT, OPTION_NAME_BOOL} from "../../../types"

type PROPS = {
    title: string,
    options: Array<{name: GENRE_CODE, label: string}> ,
    onChange: (e: GENRE_EVENT) => any,
}


const CheckBoxSet = (props: PROPS) => {

    const check_boxes = props.options.map((option: {name: GENRE_CODE, label: string})=>{
        return(
            <CheckBox
                key={option.name}
                label={option.label}
                name={option.name}
                onChange={(e: GENRE_EVENT) => { props.onChange({name: e.name, isChecked: e.isChecked}); }}
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

export default CheckBoxSet