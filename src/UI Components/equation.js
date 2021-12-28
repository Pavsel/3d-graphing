import React from "react";
import './equation.css';

import Input from './input';

export default function Equation(props) {


    function handleChange(value) {
        props.onEquationChange(value, props.axis);
    }

    return (
        <>
            <Input label={props.children} onChange={handleChange} defaultVal={props.defaultVal}/>
        </>
    );
}