import React, {Component} from "react";
import './slider.css';


export default class MySlider extends Component {


    handleSliderChange = (e) => {
        this.props.onSliderChange(e.target.value, this.props.axis);
    };

    render() {
        var fillStyle = {
            width: this.props.defaultVal*10 + "%"
        };

        return (
            <>
                <div className="middle">
                    <div className="slider-container">
                        <span className="slider-value">{this.props.children}: {this.props.defaultVal}</span>
                        <span className="bar"><span className="fill" style={fillStyle}/></span>
                        <input className="slider" type="range" onChange={this.handleSliderChange} min={0} max={10} step={0.01} value={this.props.defaultVal}/>
                    </div>
                </div>
            </>
        );
    }
}
