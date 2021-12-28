import React, {Component} from "react";
import './Scene.css';

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DoubleSide} from "three";
import {FaceColors} from "three";
import * as mathjs from 'mathjs';
import {createIsNaN} from "mathjs/es/factoriesNumber";

var mesh;
var scene;
var camera;
var renderer;
var controls;
var wireframe;

export default class Scene extends Component {
    componentDidMount() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            this.mount.clientWidth / this.mount.clientHeight,
            0.1,
            1000
        );

        // ----Creating Renderer----
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        // renderer.setClearColor("#d2e7ec");

        this.mount.appendChild(renderer.domElement); // appends the rendered using react refs

        // Catches the resize event and changes the camera accordingly
        window.addEventListener('resize', () => {
            renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
            camera.aspect = this.mount.clientWidth / this.mount.clientHeight;

            camera.updateProjectionMatrix();
        });

        // ----Camera Controls----
        controls = new OrbitControls(camera, renderer.domElement);

        camera.position.set(0, 5, 5);
        controls.update();

        // ----Generating Geometry----

        var geometry = generateFuncXYZ(this.props);

        // var geometry = new THREE.SphereGeometry();

        var material = new THREE.MeshBasicMaterial({side: DoubleSide, vertexColors: FaceColors});
        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);


        var mat = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 5});
        wireframe = new THREE.LineSegments(geometry, mat);
        mesh.add(wireframe);

        renderer.render(scene, camera);

        renderScene();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        var geo = generateFuncXYZ(this.props);

        mesh.geometry = geo;
        wireframe.geometry = geo;

        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;

        wireframe.position.x = 0;
        wireframe.position.y = 0;
        wireframe.position.z = 0;

        renderer.render(scene, camera);

    }

    render() {
        return (
            <>
                <div className="scene" ref={ref => (this.mount = ref)}/>
            </>
        );
    }
}

function renderScene() {
    requestAnimationFrame(renderScene); // this is called every frame

    controls.update(); // camera controls


    renderer.render(scene, camera);
}

function generateFuncXYZ(props) {

    var geometry = new THREE.Geometry();

    if (props.x.length > 0 && props.y.length > 0 && props.z.length > 0) {

        for (let u = 0; u < props.rez; u++) {
            for (let v = 0; v < props.rez; v++) {

                var position = inputFunction(props, u / props.rez * props.uMax, v / props.rez * props.vMax);

                if (position === undefined) {
                    return geometry;
                }


                geometry.vertices.push(position);

                //point IDs
                let topLeft = v * props.rez + u;
                let topRight = v * props.rez + u - 1;
                let bottomLeft = (v - 1) * props.rez + u;
                let bottomRight = (v - 1) * props.rez + (u - 1);


                if (u > 0 && v > 0) {

                    let face1 = new THREE.Face3(bottomLeft, topLeft, topRight);
                    let face2 = new THREE.Face3(bottomLeft, topRight, bottomRight);

                    geometry.faces.push(
                        face1,
                        face2
                    );

                    var colorA = 0xff1500;
                    var colorB = 0xffae00;


                    var currentColor = lerpColor(colorA, colorB, (u / props.rez));


                    face1.color.setHex(currentColor);
                    face2.color.setHex(currentColor);

                }

            }
        }

        geometry.computeFaceNormals();
        geometry.computeBoundingSphere();
        return geometry;
    }
    return geometry;
}

function inputFunction(props, u, v) {
    let xFunc = props.x;
    let yFunc = props.y;
    let zFunc = props.z;

    xFunc = xFunc.replace(/(^|[^a-z])([u])([^a-z]|$)/g, "$1" + u + "$3");
    xFunc = xFunc.replace(/(^|[^a-z])([v])([^a-z]|$)/g, "$1" + v + "$3");
    xFunc = xFunc.replace(/(^|[^a-z])([a])([^a-z]|$)/g, "$1" + props.a + "$3");
    xFunc = xFunc.replace(/(^|[^a-z])([b])([^a-z]|$)/g, "$1" + props.b + "$3");
    xFunc = xFunc.replace(/(^|[^a-z])([c])([^a-z]|$)/g, "$1" + props.c + "$3");
    xFunc = xFunc.replace(/(^|[^a-z])([d])([^a-z]|$)/g, "$1" + props.d + "$3");

    yFunc = yFunc.replace(/(^|[^a-z])([u])([^a-z]|$)/g, "$1" + u + "$3");
    yFunc = yFunc.replace(/(^|[^a-z])([v])([^a-z]|$)/g, "$1" + v + "$3");
    yFunc = yFunc.replace(/(^|[^a-z])([a])([^a-z]|$)/g, "$1" + props.a + "$3");
    yFunc = yFunc.replace(/(^|[^a-z])([b])([^a-z]|$)/g, "$1" + props.b + "$3");
    yFunc = yFunc.replace(/(^|[^a-z])([c])([^a-z]|$)/g, "$1" + props.c + "$3");
    yFunc = yFunc.replace(/(^|[^a-z])([d])([^a-z]|$)/g, "$1" + props.d + "$3");

    zFunc = zFunc.replace(/(^|[^a-z])([u])([^a-z]|$)/g, "$1" + u + "$3");
    zFunc = zFunc.replace(/(^|[^a-z])([v])([^a-z]|$)/g, "$1" + v + "$3");
    zFunc = zFunc.replace(/(^|[^a-z])([a])([^a-z]|$)/g, "$1" + props.a + "$3");
    zFunc = zFunc.replace(/(^|[^a-z])([b])([^a-z]|$)/g, "$1" + props.b + "$3");
    zFunc = zFunc.replace(/(^|[^a-z])([c])([^a-z]|$)/g, "$1" + props.c + "$3");
    zFunc = zFunc.replace(/(^|[^a-z])([d])([^a-z]|$)/g, "$1" + props.d + "$3");

    let x = 0;
    let y = 0;
    let z = 0;

    try {
        x = mathjs.evaluate(xFunc);
        y = mathjs.evaluate(yFunc);
        z = mathjs.evaluate(zFunc);
        return new THREE.Vector3(x, y, z);

    } catch (err) {
        // console.log("cant evaluate");
    }
}

// Utils

const lerpColor = function (a, b, amount) {
    const ar = a >> 16,
        ag = a >> 8 & 0xff,
        ab = a & 0xff,

        br = b >> 16,
        bg = b >> 8 & 0xff,
        bb = b & 0xff,

        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return (rr << 16) + (rg << 8) + (rb | 0);
};
