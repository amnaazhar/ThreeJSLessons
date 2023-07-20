import { Scene, Color, SphereGeometry, Mesh, MeshNormalMaterial } from "three";

const aboutScene = new Scene();
aboutScene.background = new Color(0xffff00);

const sphere = new Mesh(
  new SphereGeometry(2, 32, 32),
  new MeshNormalMaterial()
);

aboutScene.add(sphere);

export default aboutScene;
