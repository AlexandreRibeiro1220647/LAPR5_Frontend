// Thumb Raiser - JPP 2021, 2022, 2023
// 3D modeling
// 3D models importing
// Perspective and orthographic projections
// Viewing
// Linear and affine transformations
// Lighting and materials
// Shadow projection
// Texture mapping
// User interaction

import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Orientation from "./orientation.js";
import { generalData, floormapData, lightsData, cameraData } from "./default_data.js";
import { merge } from "./merge.js";
import Floormap from "./floormap.js";
import Lights from "./lights.js";
import Camera from "./camera.js";

export default class HospitalFloor {
    constructor(generalParameters, floormapParameters, lightsParameters, fixedViewCameraParameters, topViewCameraParameters) {
        this.generalParameters = merge({}, generalData, generalParameters);
        this.floormapParameters = merge({}, floormapData, floormapParameters);
        this.lightsParameters = merge({}, lightsData, lightsParameters);
        this.fixedViewCameraParameters = merge({}, cameraData, fixedViewCameraParameters);
        this.topViewCameraParameters = merge({}, cameraData, topViewCameraParameters);

        // Create a 2D scene (the viewports frames)
        this.scene2D = new THREE.Scene();

        // Create a square
        let points = [new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(1.0, 0.0, 0.0), new THREE.Vector3(1.0, 1.0, 0.0), new THREE.Vector3(0.0, 1.0, 0.0)];
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.square = new THREE.LineLoop(geometry, material);
        this.scene2D.add(this.square);

        // Create the camera corresponding to the 2D scene
        this.camera2D = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, 0.0, 1.0);

        // Create a 3D scene (the game itself)
        this.scene3D = new THREE.Scene();

        // Create and add the hospital beds
        const loader = new GLTFLoader();
        loader.load(
            "./models/gltf/Hospital_Bed/hospital_bed.glb",
            (gltf) => {
                const bed = gltf.scene;
                for (let i = -1; i <= 3; i += 1.9) {
                    for (let j = -1; j < 1; j += 1.12) {
                        const clone = bed.clone();
                        clone.position.set(j * 5.3, 0, i * 1.57);
                        clone.scale.set(0.4, 0.35, 0.45);
                        clone.rotation.y = Math.PI / 2;
                        clone.castShadow = true;
                        clone.receiveShadow = true;
                        this.scene3D.add(clone);
                    }
                }
            }
        );

        // Create and add the hospital doors
        loader.load(
            "./models/gltf/Hospital_Door/hospital_door.glb",
            (gltf) => {
                const door = gltf.scene;
                for (let i = 0; i < 6; i ++) {
                    const clone = door.clone();
                    switch (i) {
                        case 0:
                            clone.position.set(1.5, 0, -3.5);
                            break;
                        case 1:
                            clone.position.set(1.5, 0, -0.5);
                            break;
                        case 2:
                            clone.position.set(1.5, 0, 2.5);
                            break;
                        case 3:
                            clone.position.set(-1.5, 0, -3.5);
                            break;
                        case 4:
                            clone.position.set(-1.5, 0, -0.5);
                            break;
                        case 5:
                            clone.position.set(-1.5, 0, 2.5);
                            break;
                    }
                    clone.scale.set(0.0007, 0.0005, 0.0005);
                    clone.rotation.y = Math.PI / 2;
                    clone.castShadow = true;
                    clone.receiveShadow = true;
                    this.scene3D.add(clone);
                }
                for (let i = 0; i < 6; i ++) {
                    const clone = door.clone();
                    switch (i) {
                        case 0:
                            clone.position.set(1.5, 0, -2.5);
                            break;
                        case 1:
                            clone.position.set(1.5, 0, 0.5);
                            break;
                        case 2:
                            clone.position.set(1.5, 0, 3.5);
                            break;
                        case 3:
                            clone.position.set(-1.5, 0, -2.5);
                            break;
                        case 4:
                            clone.position.set(-1.5, 0, 0.5);
                            break;
                        case 5:
                            clone.position.set(-1.5, 0, 3.5);
                            break;
                    }
                    clone.scale.set(0.0007, 0.0005, 0.0005);
                    clone.rotation.y = - Math.PI / 2;
                    clone.castShadow = true;
                    clone.receiveShadow = true;
                    this.scene3D.add(clone);
                }
            }
        );

        // Create and add the patients
        loader.load(
            "./models/gltf/Patient/patient.glb",
            (gltf) => {
                const patient = gltf.scene;
                for (let i = 1; i < 7; i ++) {
                    const clone = patient.clone();
                    switch (i) {
                        case 1:
                            clone.position.set(-2.95, 0.31, 2.96);
                            clone.visible = true;
                            break;
                        case 2:
                            clone.position.set(-2.95, 0.31, -0.02);
                            clone.visible = true;
                            break;
                        case 3:
                            clone.position.set(-2.95, 0.31, -3.0);
                            clone.visible = true;
                            break;
                        case 4:
                            clone.position.set(2.97, 0.31, 2.96);
                            clone.visible = true;
                            break;
                        case 5:
                            clone.position.set(2.97, 0.31, -0.02);
                            clone.visible = true;
                            break;
                        case 6:
                            clone.position.set(2.97, 0.31, -3.0);
                            clone.visible = true;
                            break;
                    }
                    clone.scale.set(0.005, 0.005, 0.0045);
                    clone.castShadow = true;
                    clone.receiveShadow = true;
                    this.scene3D.add(clone);
                }
            }
        );

        // Create the floor map
        this.floormap = new Floormap(this.floormapParameters);

        // Create the lights
        this.lights = new Lights(this.lightsParameters);

        // Create the cameras corresponding to the four different views: fixed view and top view
        this.fixedViewCamera = new Camera(this.fixedViewCameraParameters, window.innerWidth, window.innerHeight);
        this.topViewCamera = new Camera(this.topViewCameraParameters, window.innerWidth, window.innerHeight);

        // Create a renderer and turn on shadows in the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        if (this.generalParameters.setDevicePixelRatio) {
            this.renderer.setPixelRatio(window.devicePixelRatio);
        }
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Set the mouse move action (none)
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;

        // Set the game state
        this.gameRunning = false;

        // Get and configure the panel's <div> elements
        this.viewsPanel = document.getElementById("views-panel");
        this.view = document.getElementById("view");
        this.projection = document.getElementById("projection");
        this.horizontal = document.getElementById("horizontal");
        this.horizontal.step = 1;
        this.vertical = document.getElementById("vertical");
        this.vertical.step = 1;
        this.distance = document.getElementById("distance");
        this.distance.step = 0.1;
        this.zoom = document.getElementById("zoom");
        this.zoom.step = 0.1;
        this.reset = document.getElementById("reset");
        this.resetAll = document.getElementById("reset-all");

        // Set the active view camera (fixed view)
        this.setActiveViewCamera(this.fixedViewCamera);

        // Register the event handler to be called on window resize
        window.addEventListener("resize", event => this.windowResize(event));

        // Register the event handler to be called on key down
        document.addEventListener("keydown", event => this.keyChange(event, true));

        // Register the event handler to be called on key release
        document.addEventListener("keyup", event => this.keyChange(event, false));

        // Register the event handler to be called on mouse down
        this.renderer.domElement.addEventListener("mousedown", event => this.mouseDown(event));

        // Register the event handler to be called on mouse move
        this.renderer.domElement.addEventListener("mousemove", event => this.mouseMove(event));

        // Register the event handler to be called on mouse up
        this.renderer.domElement.addEventListener("mouseup", event => this.mouseUp(event));

        // Register the event handler to be called on mouse wheel
        this.renderer.domElement.addEventListener("wheel", event => this.mouseWheel(event));

        // Register the event handler to be called on context menu
        this.renderer.domElement.addEventListener("contextmenu", event => this.contextMenu(event));

        // Register the event handler to be called on select, input number, or input checkbox change
        this.view.addEventListener("change", event => this.elementChange(event));
        this.projection.addEventListener("change", event => this.elementChange(event));
        this.horizontal.addEventListener("change", event => this.elementChange(event));
        this.vertical.addEventListener("change", event => this.elementChange(event));
        this.distance.addEventListener("change", event => this.elementChange(event));
        this.zoom.addEventListener("change", event => this.elementChange(event));

        // Register the event handler to be called on input button click
        this.reset.addEventListener("click", event => this.buttonClick(event));
        this.resetAll.addEventListener("click", event => this.buttonClick(event));
        this.activeElement = document.activeElement;
    }

    displayPanel() {
        this.view.options.selectedIndex = ["fixed", "top"].indexOf(this.activeViewCamera.view);
        this.projection.options.selectedIndex = ["perspective", "orthographic"].indexOf(this.activeViewCamera.projection);
        this.horizontal.value = this.activeViewCamera.orientation.h.toFixed(0);
        this.vertical.value = this.activeViewCamera.orientation.v.toFixed(0);
        this.distance.value = this.activeViewCamera.distance.toFixed(1);
        this.zoom.value = this.activeViewCamera.zoom.toFixed(1);
    }

    // Set active view camera
    setActiveViewCamera(camera) {
        this.activeViewCamera = camera;
        this.horizontal.min = this.activeViewCamera.orientationMin.h.toFixed(0);
        this.horizontal.max = this.activeViewCamera.orientationMax.h.toFixed(0);
        this.vertical.min = this.activeViewCamera.orientationMin.v.toFixed(0);
        this.vertical.max = this.activeViewCamera.orientationMax.v.toFixed(0);
        this.distance.min = this.activeViewCamera.distanceMin.toFixed(1);
        this.distance.max = this.activeViewCamera.distanceMax.toFixed(1);
        this.zoom.min = this.activeViewCamera.zoomMin.toFixed(1);
        this.zoom.max = this.activeViewCamera.zoomMax.toFixed(1);
        this.displayPanel();
    }

    pointerIsOverViewport(pointer, viewport) {
        return (
            pointer.x >= viewport.x &&
            pointer.x < viewport.x + viewport.width &&
            pointer.y >= viewport.y &&
            pointer.y < viewport.y + viewport.height);
    }

    getPointedViewport(pointer) {
        let viewport;
        // Check if the pointer is over the remaining camera viewports
        let cameras;
        cameras = [this.activeViewCamera];
        for (const camera of cameras) {
            viewport = camera.getViewport();
            if (this.pointerIsOverViewport(pointer, viewport)) {
                return camera.view;
            }
        }
        // No camera viewport is being pointed
        return "none";
    }

    windowResize() {
        this.fixedViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.topViewCamera.updateWindowSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    mouseDown(event) {
        if (event.buttons == 1 || event.buttons == 2) { // Primary or secondary button down
            // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
            this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
            // Select the camera whose view is being pointed
            const cameraView = this.getPointedViewport(this.mousePosition);
            if (cameraView != "none") {
                 // One of the remaining cameras selected
                const cameraIndex = ["fixed", "top"].indexOf(cameraView);
                this.view.options.selectedIndex = cameraIndex;
                this.setActiveViewCamera([this.fixedViewCamera, this.topViewCamera][cameraIndex]);
                if (event.buttons == 1) { // Primary button down
                    this.changeCameraDistance = true;
                }
                else { // Secondary button down
                    this.changeCameraOrientation = true;
                }
                
            }
        }
    }

    mouseMove(event) {
        if (event.buttons == 1 || event.buttons == 2) { // Primary or secondary button down
            if (this.changeCameraDistance || this.changeCameraOrientation) { // Mouse action in progress
                // Compute mouse movement and update mouse position
                const newMousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
                const mouseIncrement = newMousePosition.clone().sub(this.mousePosition);
                this.mousePosition = newMousePosition;
                if (event.buttons == 1) { // Primary button down

                    // Defined in the next sprint

                }
                else { // Secondary button down
                    if (this.changeCameraOrientation) {
                        this.activeViewCamera.updateOrientation(mouseIncrement.multiply(new THREE.Vector2(-0.5, 0.5)));
                        this.displayPanel();
                    }
                }
            }
        }
    }

    mouseUp(event) {
        // Reset mouse move action
        this.changeCameraDistance = false;
        this.changeCameraOrientation = false;
    }

    mouseWheel(event) {
        // Prevent the mouse wheel from scrolling the document's content
        event.preventDefault();
        // Store current mouse position in window coordinates (mouse coordinate system: origin in the top-left corner; window coordinate system: origin in the bottom-left corner)
        this.mousePosition = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY - 1);
        // Select the camera whose view is being pointed
        const cameraView = this.getPointedViewport(this.mousePosition);
        if (cameraView != "none") { // One of the remaining cameras selected
            const cameraIndex = ["fixed", "top"].indexOf(cameraView);
            this.view.options.selectedIndex = cameraIndex;
            const activeViewCamera = [this.fixedViewCamera, this.topViewCamera][cameraIndex];
            activeViewCamera.updateZoom(-0.001 * event.deltaY);
            this.setActiveViewCamera(activeViewCamera);
        }
    }

    contextMenu(event) {
        // Prevent the context menu from appearing when the secondary mouse button is clicked
        event.preventDefault();
    }

    elementChange(event) {
        switch (event.target.id) {
            case "view":
                this.setActiveViewCamera([this.fixedViewCamera, this.topViewCamera][this.view.options.selectedIndex]);
                break;
            case "projection":
                this.activeViewCamera.setActiveProjection(["perspective", "orthographic"][this.projection.options.selectedIndex]);
                this.displayPanel();
                break;
            case "horizontal":
            case "vertical":
            case "distance":
            case "zoom":
                if (event.target.checkValidity()) {
                    switch (event.target.id) {
                        case "horizontal":
                        case "vertical":
                            this.activeViewCamera.setOrientation(new Orientation(this.horizontal.value, this.vertical.value));
                            break;
                        case "distance":
                            this.activeViewCamera.setDistance(this.distance.value);
                            break;
                        case "zoom":
                            this.activeViewCamera.setZoom(this.zoom.value);
                            break;
                    }
                }
                break;
        }
    }

    buttonClick(event) {
        switch (event.target.id) {
            case "reset":
                this.activeViewCamera.initialize();
                break;
            case "reset-all":
                this.fixedViewCamera.initialize();
                this.topViewCamera.initialize();
                break;
        }
        this.displayPanel();
    }

    update() {
        if (!this.gameRunning) {
            if (this.floormap.loaded) { // If all resources have been loaded
                // Add the floor map and the lights to the scene
                this.scene3D.add(this.floormap.object);
                this.scene3D.add(this.lights.object);

                // Start the game
                this.gameRunning = true;
            }
        }
        else {

            // Render primary viewport(s)
            this.renderer.clear();

            let cameras;
            cameras = [this.activeViewCamera];
            for (const camera of cameras) {
                const viewport = camera.getViewport();
                this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                this.renderer.render(this.scene3D, camera.object);
                this.renderer.render(this.scene2D, this.camera2D);
                this.renderer.clearDepth();
            }
        }
    }
}