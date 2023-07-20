import { Camera, Group, Vector4, Scene } from "three";

import aboutScene from "./scenes/about-scene";
import landingScene from "./scenes/landing-scene";
import { perspectiveCamera as camera, debugCamera } from "./camera";
import renderer from "./renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gui from "./gui";
import settings from "./settings";
import { stats, rendererStats } from "./stats";
import HelpersManager from "./utils";

export default class WebGLApp {
  controls: OrbitControls;
  debugControls: OrbitControls;
  helpers = new Group();
  viewport = { debug: new Vector4(), main: new Vector4() };
  scenes: { [key: string]: Scene } = {
    aboutScene,
    landingScene,
  };
  scene = landingScene; //change the default in gui too if you change this

  constructor(parent: HTMLElement) {
    // Setup and create content
    parent.appendChild(renderer.domElement);

    //add camera
    this.scenes.aboutScene.add(camera, debugCamera);
    this.scenes.landingScene.add(camera, debugCamera);

    //addgui
    this.addGui();

    window.addEventListener("resize", this.resize);
    this.resize();

    // OrbitControls for scene navigation
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.debugControls = new OrbitControls(debugCamera, renderer.domElement);

    this.update();
    //renderer.canvas
  }

  addGui = () => {
    const settingsGUI = gui.addFolder("settings");
    settingsGUI.add(settings, "debugCamera");

    const keys = Object.keys(this.scenes);
    const defaultScene = settingsGUI
      .add(this, "Scenes", keys)
      .onChange((value: string) => {
        value === "landingScene"
          ? (this.scene = this.scenes.landingScene)
          : (this.scene = this.scenes.aboutScene);
      });

    defaultScene.setValue("landingScene");

    //  show helpers for each scene:
    for (const sceneName in this.scenes) {
      const helpers = new HelpersManager();
      this.scenes[sceneName].add(helpers.helpersGroup);
      let sceneGUI = gui.addFolder(sceneName);
      sceneGUI.add(helpers.helpersGroup, "visible").name("helpers");
    }
  };

  // dispose = (scene : Scene) = > {

  // }

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
    renderer.render(this.scene, camera);
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
