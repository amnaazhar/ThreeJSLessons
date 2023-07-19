import { AxesHelper, Camera, GridHelper, Group, Vector4 } from "three";

import { scene } from "./scene";
import { perspectiveCamera as camera, debugCamera } from "./camera";
import renderer from "./renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gui from "./gui";
import settings from "./settings";
import { stats, rendererStats } from "./stats";

export default class WebGLApp {
  controls: OrbitControls;
  debugControls: OrbitControls;
  helpers = new Group();
  viewport = { debug: new Vector4(), main: new Vector4() };

  constructor(parent: HTMLElement) {
    // Setup and create content
    parent.appendChild(renderer.domElement);
    //add camera
    scene.add(camera, debugCamera);

    window.addEventListener("resize", this.resize);

    // Add GridHelper and AxesHelper to the scene
    const gridHelper = new GridHelper(10, 10);
    const axesHelper = new AxesHelper(5);
    this.helpers.add(gridHelper, axesHelper);
    gui.add(this.helpers, "visible").name("helpers");
    this.resize();

    gui.add(settings, "debugCamera");
    scene.add(this.helpers);
    // Position the camera and use lookAt to focus on the scene center
    debugCamera.position.set(10, 10, 10);
    debugCamera.lookAt(0, 0, 0);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // OrbitControls for scene navigation
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.debugControls = new OrbitControls(debugCamera, renderer.domElement);

    this.update();
    //renderer.canvas
  }

  resize = () => {
    // Resize renderer
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (settings.debugCamera) {
      debugCamera.aspect = window.innerWidth / window.innerHeight;
      debugCamera.updateProjectionMatrix();
    }
    this.viewport.debug.set(
      0,
      0,
      window.innerWidth * 0.25,
      window.innerHeight * 0.25
    );
    this.viewport.main.set(0, 0, window.innerWidth, window.innerHeight);
  };

  render = (camera: Camera, viewport: Vector4) => {
    renderer.setViewport(viewport); // sets view to renderer scissor dimensions
    renderer.setScissor(viewport); // sets renderer scissor
    renderer.render(scene, camera);
  };

  update = () => {
    // Render scene
    requestAnimationFrame(this.update);
    if (settings.debugCamera) {
      //debug
      this.render(debugCamera, this.viewport.main);
      //main
      renderer.info.reset();
      this.render(camera, this.viewport.debug);
      this.debugControls.update();
    } else {
      this.render(camera, this.viewport.main);
      this.controls.update();
    }
    stats.update();
    rendererStats.update(renderer);
    renderer.info.reset();
  };
}
