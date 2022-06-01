import React from "react"
import "./style.css"

// utils
const getMax = (a, b) => { if (a >= b) { return a; } else { return b; } }

const getMin = (a, b) => { if (a >= b) { return b; } else { return a; } }

// Slider Track React JSX
const SliderTrack = (props) => {
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
const DualRange = (props) => {

    const values = props.values;
    const indexMax = values.length - 1;

    const [indexLower, setIndexLower] = React.useState(0);
    const [indexUpper, setIndexUpper] = React.useState(indexMax);

    const handleChangeLower = (e) => {
        const index = getMin(e.target.value, indexUpper - 1);
        setIndexLower(index);
        props.handleChange({name: props.lower_name, value: values[index]});
    }

    const handleChangeUpper = (e) => {
        const index = getMax(e.target.value, parseInt(indexLower) + 1);
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