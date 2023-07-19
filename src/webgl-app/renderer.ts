import { WebGLRenderer } from "three";

const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setScissorTest(true);
renderer.info.autoReset = false;
export default renderer;
