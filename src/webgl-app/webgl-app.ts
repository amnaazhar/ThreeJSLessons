import { AxesHelper, GridHelper } from "three";

import { scene } from "./scene";
import { perspectiveCamera as camera } from "./camera";
import renderer from "./renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class WebGLApp {
  controls: OrbitControls;

  constructor(parent: HTMLElement) {
    // Setup and create content
    parent.appendChild(renderer.domElement);
    //add camera
    scene.add(camera);

    window.addEventListener("resize", this.resize);

    // Add GridHelper and AxesHelper to the scene
    const gridHelper = new GridHelper(10, 10);
    const axesHelper = new AxesHelper(5);
    scene.add(gridHelper, axesHelper);
    // Position the camera and use lookAt to focus on the scene center
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // OrbitControls for scene navigation
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.update();
    //renderer.canvas
  }

  resize = () => {
    // Resize renderer
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  update = () => {
    // Render scene

    this.controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(this.update);
  };
}
