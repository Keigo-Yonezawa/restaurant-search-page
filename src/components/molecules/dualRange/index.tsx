import React from "react"
import "./style.css"
import {getMax, getMin} from "../../../utils/common"
import { DUAL_RANGE_EVENT, OPTION_NAME_NUM } from "../../../types"

type PROPS = {
    title: string,
    lower_name: OPTION_NAME_NUM,
    upper_name: OPTION_NAME_NUM,
    value_head: string,
    value_tail: string,
    values: Array<number>,
    handleChange: (e: DUAL_RANGE_EVENT) => any,
}

// Slider Track React JSX
const SliderTrack = (props: {percent1: number, percent2: number}) => {
    return (
        <div 
            className="slider-track"
            style={{
                background: 
                    `linear-gradient(
                    to right, 
                    #dadae5 ${props.percent1}% 
                    , #3264fe ${props.percent1}% 
                    , #3264fe ${props.percent2}%
                    , #dadae5 ${props.percent2}%)`
            }}
        >
        </div>
    );
}

// main
const DualRange = (props: PROPS) => {

    const values = props.values;
    const indexMax = values.length - 1;

    const [indexLower, setIndexLower] = React.useState<number>(0);
    const [indexUpper, setIndexUpper] = React.useState<number>(indexMax);

    const handleChangeLower = (e: any) => {
        const index = getMin(e.target.value, Number(indexUpper) - 1);
        setIndexLower(index);
        props.handleChange({name: props.lower_name, value: values[index]});
    }

    const handleChangeUpper = (e: any) => {
        const index = getMax(e.target.value, Number(indexLower) + 1);
        setIndexUpper(index);
        props.handleChange({name: props.upper_name, value: values[index]});
    }

    return(
        <div className="dual-range-container">
            <h3>{props.title}</h3>
            <div className="dual-range-value">
                {props.value_head}{values[indexLower]}{props.value_tail} ~ {props.value_head}{values[indexUpper]}{props.value_tail}
            </div>
            <div className="input-container">
                <SliderTrack
                    percent1={(indexLower / indexMax) * 100}
                    percent2={(indexUpper / indexMax) * 100}
                />
                <input type="range" min="0" max={indexMax} value={indexLower} id="slider-1" onChange = {(e) => handleChangeLower(e)} />
                <input type="range" min="0" max={indexMax} value={indexUpper} id="slider-2" onChange = {(e) => handleChangeUpper(e)} />
            </div>
        </div>
    )
}

export default DualRange