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

// Position the camera and use lookAt to focus on the scene center
debugCamera.position.set(10, 10, 10);
debugCamera.lookAt(0, 0, 0);
perspectiveCamera.position.set(10, 10, 10);
perspectiveCamera.lookAt(0, 0, 0);
