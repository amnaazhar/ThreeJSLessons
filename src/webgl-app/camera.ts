import { PerspectiveCamera } from "three";

export const perspectiveCamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

export const debugCamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
