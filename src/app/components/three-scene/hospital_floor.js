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

        this.raycaster = new THREE.Raycaster();

        // Create and add the hospital beds
        this.beds = []
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
                        this.beds.push(clone);
                    }
                }
            },
            undefined,
            (error) => {
                console.error("Failed to load the model:", error);
            }
        );

        this.bedcubes = []

        let geometrycube = new THREE.BoxGeometry(0.42, 0.35, 0.85);
        const materialcube = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });

        this.cube1 = new THREE.Mesh(geometrycube, materialcube);
        this.cube1.position.x = -2.96;
        this.cube1.position.y = 0.18;
        this.cube1.position.z = 3.025;
        this.scene3D.add(this.cube1);
        this.bedcubes.push(this.cube1);
        const edges1 = new THREE.EdgesGeometry( geometrycube );
        this.line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
        this.line1.position.x = -2.96;
        this.line1.position.y = 0.18;
        this.line1.position.z = 3.025;
        this.scene3D.add(this.line1);
        
        this.cube2 = new THREE.Mesh(geometrycube, materialcube);
        this.cube2.position.x = -2.96;
        this.cube2.position.y = 0.18;
        this.cube2.position.z = 0.04;
        this.scene3D.add(this.cube2);
        this.bedcubes.push(this.cube2);
        const edges2 = new THREE.EdgesGeometry( geometrycube );
        this.line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
        this.line2.position.x = -2.96;
        this.line2.position.y = 0.18;
        this.line2.position.z = 0.04;
        this.scene3D.add(this.line2);

        this.cube3 = new THREE.Mesh(geometrycube, materialcube);
        this.cube3.position.x = -2.96;
        this.cube3.position.y = 0.18;
        this.cube3.position.z = -2.94;
        this.scene3D.add(this.cube3);
        this.bedcubes.push(this.cube3);
        const edges3 = new THREE.EdgesGeometry( geometrycube );
        this.line3 = new THREE.LineSegments(edges3, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
        this.line3.position.x = -2.96;
        this.line3.position.y = 0.18;
        this.line3.position.z = -2.94;
        this.scene3D.add(this.line3);

        this.cube4 = new THREE.Mesh(geometrycube, materialcube);
        this.cube4.position.x = 2.975;
        this.cube4.position.y = 0.18;
        this.cube4.position.z = 3.025;
        this.scene3D.add(this.cube4);
        this.bedcubes.push(this.cube4);
        const edges4 = new THREE.EdgesGeometry( geometrycube );
        this.line4 = new THREE.LineSegments(edges4, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
        this.line4.position.x = 2.975;
        this.line4.position.y = 0.18;
        this.line4.position.z = 3.025;
        this.scene3D.add(this.line4);

        this.cube5 = new THREE.Mesh(geometrycube, materialcube);
        this.cube5.position.x = 2.975;
        this.cube5.position.y = 0.18;
        this.cube5.position.z = 0.04;
        this.scene3D.add(this.cube5);
        this.bedcubes.push(this.cube5);
        const edges5 = new THREE.EdgesGeometry( geometrycube );
        this.line5 = new THREE.LineSegments(edges5, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
        this.line5.position.x = 2.975;
        this.line5.position.y = 0.18;
        this.line5.position.z = 0.04;
        this.scene3D.add(this.line5);

        this.cube6 = new THREE.Mesh(geometrycube, materialcube);
        this.cube6.position.x = 2.975;
        this.cube6.position.y = 0.18;
        this.cube6.position.z = -2.94;
        this.scene3D.add(this.cube6);
        this.bedcubes.push(this.cube6);
        const edges6 = new THREE.EdgesGeometry( geometrycube );
        this.line6 = new THREE.LineSegments(edges6, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
        this.line6.position.x = 2.975;
        this.line6.position.y = 0.18;
        this.line6.position.z = -2.94;
        this.scene3D.add(this.line6);

        //----------------------------------------------------------------

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
                    const pointer = new THREE.Vector2();
                    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

                    let cameras;
                    cameras = [this.activeViewCamera];
                    for (const camera of cameras) {
                        this.raycaster.setFromCamera(pointer, camera.object);
                        const intersections = this.raycaster.intersectObjects(this.bedcubes, true); 

                        if (intersections.length > 0) {
                            const selectedObject = intersections[0].object;
                            switch (selectedObject) {
                                case this.bedcubes[0]:
                                    camera.object.position.set(-4, 4, 4);
                                    camera.object.lookAt(-2.96, 0.18, 3.025);
                                    break;
                                case this.bedcubes[1]:
                                    camera.object.position.set(-4, 4, 1);
                                    camera.object.lookAt(-2.96, 0.18, 0.04);
                                    break;
                                case this.bedcubes[2]:
                                    camera.object.position.set(-4, 4, -2);
                                    camera.object.lookAt(-2.96, 0.18, -2.94);
                                    break;
                                case this.bedcubes[3]:
                                    camera.object.position.set(2, 4, 4);
                                    camera.object.lookAt(2.975, 0.18, 3.025);
                                    break;
                                case this.bedcubes[4]:
                                    camera.object.position.set(2, 4, 1);
                                    camera.object.lookAt(2.975, 0.18, 0.04);
                                    break;
                                case this.bedcubes[5]:
                                    camera.object.position.set(2, 4, -2);
                                    camera.object.lookAt(2.975, 0.18, -2.94);
                                    break;    
                                default:
                            }
                        } 
                    }
                }
                else { // Secondary button down
                    this.changeCameraOrientation = true;
                }
                
            }
        }
    }

    mouseMove(event) {
        const pointer = new THREE.Vector2();
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        let cameras;
        cameras = [this.activeViewCamera];
        for (const camera of cameras) {
            this.raycaster.setFromCamera(pointer, camera.object);
            const intersections = this.raycaster.intersectObjects(this.bedcubes, true);
            if (intersections.length > 0) {
                const selectedObject = intersections[0].object;
                switch (selectedObject) {
                    case this.bedcubes[0]:
                        this.line1.visible = true;
                        break;
                    case this.bedcubes[1]:
                        this.line2.visible = true;
                        break;
                    case this.bedcubes[2]:
                        this.line3.visible = true;
                        break;
                    case this.bedcubes[3]:
                        this.line4.visible = true;
                        break;
                    case this.bedcubes[4]:
                        this.line5.visible = true;
                        break;
                    case this.bedcubes[5]:
                        this.line6.visible = true;
                        break;    
                    default:
                }
            } else {
                this.line1.visible = false;
                this.line2.visible = false;
                this.line3.visible = false;
                this.line4.visible = false;
                this.line5.visible = false;
                this.line6.visible = false;
            }
        }

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