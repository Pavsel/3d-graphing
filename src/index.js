import React, {Component} from "react";
import ReactDOM from "react-dom";
import './index.css';
import Scene from './3D Scene/Scene';


import Equation from "./UI Components/equation";
import Slider from "./UI Components/slider";


class Preset {
    name;
    fx;
    fy;
    fz;
    uMax;
    vMax;
    rez;
    a;
    b;
    c;
    d;

    constructor(
        name,
        fx,
        fy,
        fz,
        uMax,
        vMax,
        rez,
        a = '1',
        b = '1',
        c = '1',
        d = '1',
    ) {
        this.name = name;
        this.fx = fx;
        this.fy = fy;
        this.fz = fz;
        this.uMax = uMax;
        this.vMax = vMax;
        this.rez = rez;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
}


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            presetName: 'none',
            x: '', y: '', z: '',
            uMax: '', vMax: '', rez: '',
            a: '1', b: '1', c: '1', d: '1',
        };

        // this.handleSliderChange = this.handleSliderChange.bind(this);
    }


    presets = [
        new Preset("None",
            '', "", "",
            "", "", "",
        ),
        new Preset("Twisted Torus",
            'cos(u)*(a-(c/d + sin(b*v))*sin(v-b*u))', '(a-(c/d + sin(b*v))*sin(v-b*u))*sin(u)', '-cos(v-b*u)*(c/d +sin(b*v))',
            '6.489',  '6.489', '32',
            '6', '3', '5', '4'
        ),
        new Preset("Shell",
            'cos(v)*(1+cos(u))*sin(v/a)', "sin(v)*(1+cos(u))*sin(v/a)", "sin(u)*sin(v/a)+cos(v/a)*1.5",
            "6.5",  "12.57", "32",
            "8",
        ),
        new Preset("Stairway to Haven",
            'v*cos(u)', 'a*u', 'v*sin(u)',
            '15', '2', '32',
            '.25',
        ),
        new Preset("Moebius",
            'cos(v)+u*cos(v/a)*cos(v)', 'u*sin(v/a)', 'sin(v)+u*cos(v/a)*sin(v)',
            '.8', '6.385', '32',
            '2'
        ),
        new Preset("Candy",
            'u', "cos(u)*sin(v)", "cos(u)*cos(v)",
            "6", "6.385", "64"
        ),
    ];

    presetIndex = 0;

    changePresetUp = () => {
        this.presetIndex++;
        if (this.presetIndex > this.presets.length - 1) {
            this.presetIndex = 0;
        }
        this.loadPreset();
    };

    changePresetDown = () => {
        this.presetIndex--;
        if (this.presetIndex < 0) {
            this.presetIndex = this.presets.length - 1;
        }
        this.loadPreset();
    };

    clearPreset = () => {
        this.presetIndex = 0;
        this.loadPreset();
    };

    loadPreset = () => {
        this.setState({presetName: this.presets[this.presetIndex].name});
        this.setState({x: this.presets[this.presetIndex].fx});
        this.setState({y: this.presets[this.presetIndex].fy});
        this.setState({z: this.presets[this.presetIndex].fz});
        this.setState({uMax: this.presets[this.presetIndex].uMax});
        this.setState({vMax: this.presets[this.presetIndex].vMax});
        this.setState({rez: this.presets[this.presetIndex].rez});
        this.setState({a: this.presets[this.presetIndex].a});
        this.setState({b: this.presets[this.presetIndex].b});
        this.setState({c: this.presets[this.presetIndex].c});
        this.setState({d: this.presets[this.presetIndex].d});
    };


    handleSliderChange = (val, axis) => {
        if (axis === 'a') {
            this.setState({a: val});
        } else if (axis === 'b') {
            this.setState({b: val});
        } else if (axis === 'c') {
            this.setState({c: val});
        } else if (axis === 'd') {
            this.setState({d: val});
        }
    };

    handleFormulaChange = (formula, axis) => {
        // see if I can just grab the state and set it without the stupid checks
        // this.setState({axis: });

        if (axis === 'x') {
            this.setState({x: formula});
        } else if (axis === 'y') {
            this.setState({y: formula});
        } else if (axis === 'z') {
            this.setState({z: formula});
        } else if (axis === 'uMax') {
            this.setState({uMax: formula});
        } else if (axis === 'vMax') {
            this.setState({vMax: formula});
        } else if (axis === 'rez') {
            this.setState({rez: formula});
        }
    };


    render() {
        return (
            <>
                <section>

                    {/*<div className="scene-container">*/}
                    <Scene x={this.state.x} y={this.state.y} z={this.state.z}
                           uMax={this.state.uMax}
                           vMax={this.state.vMax} rez={this.state.rez}
                           a={this.state.a} b={this.state.b} c={this.state.c} d={this.state.d}

                    />
                    {/*</div>*/}

                    <div className="content-bar">

                        <div className="input-group">
                            <h3>presents</h3>
                            <div className="preset-selector">
                                <button className="arrow" onClick={this.changePresetDown}>
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M36.0122 71.3675L45.7654 61.6143L20.1633 36.0122L45.7654 10.4101L36.0122 0.656855L0.656856 36.0122L36.0122 71.3675Z"/>
                                    </svg>
                                </button>
                                <h4 className="preset-name">{this.state.presetName}</h4>
                                <button className="arrow" onClick={this.changePresetUp}>
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M36.0122 71.3675L26.259 61.6143L51.8611 36.0122L26.259 10.4101L36.0122 0.656855L71.3675 36.0122L36.0122 71.3675Z"/>
                                    </svg>
                                </button>
                            </div>
                            <button onClick={this.clearPreset}>clear preset</button>
                        </div>


                        <div className="input-group">
                            <h3>Equations</h3>
                            <Equation onEquationChange={this.handleFormulaChange} axis='x'
                                      defaultVal={this.state.x}>x</Equation>
                            <Equation onEquationChange={this.handleFormulaChange} axis='y'
                                      defaultVal={this.state.y}>y</Equation>
                            <Equation onEquationChange={this.handleFormulaChange} axis='z'
                                      defaultVal={this.state.z}>z</Equation>
                        </div>

                        <div className="input-group">
                            <h3>UV Settings</h3>
                            <p>High resolution settings affect performance.</p>
                            <Equation onEquationChange={this.handleFormulaChange} axis='uMax'
                                      defaultVal={this.state.uMax}>u max</Equation>
                            <Equation onEquationChange={this.handleFormulaChange} axis='vMax'
                                      defaultVal={this.state.vMax}>v max</Equation>
                            <Equation onEquationChange={this.handleFormulaChange} axis='rez'
                                      defaultVal={this.state.rez}>resolution</Equation>
                        </div>

                        <div className="input-group">
                            <h3>Slider Variables</h3>
                            <Slider onSliderChange={this.handleSliderChange} axis='a'
                                    defaultVal={this.state.a}>a</Slider>
                            <Slider onSliderChange={this.handleSliderChange} axis='b'
                                    defaultVal={this.state.b}>b</Slider>
                            <Slider onSliderChange={this.handleSliderChange} axis='c'
                                    defaultVal={this.state.c}>c</Slider>
                            <Slider onSliderChange={this.handleSliderChange} axis='d'
                                    defaultVal={this.state.d}>d</Slider>
                        </div>

                    </div>
                </section>
            </>
        );
    }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);

