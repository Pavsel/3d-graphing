import React, {Component} from "react";
import './input.css';

export default function Input(props) {

    function handleChange(e)
    {
        if (props.onChange !== undefined) {

            let value = e.target.value;
            props.onChange(value);
        }
    }


    return (
        <>
            <div className="container">
                <input onChange={handleChange} type="text" onautocomplete="off" required value={props.defaultVal}/>
                <label className="label-name">
                    <span className="content">{props.label}</span>
                </label>
            </div>
        </>
    );
}