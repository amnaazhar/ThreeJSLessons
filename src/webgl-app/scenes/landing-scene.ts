import { Scene, Color, BoxGeometry, Mesh, MeshNormalMaterial } from "three";

const landingScene = new Scene();
landingScene.background = new Color(0xffff00);

const box = new Mesh(new BoxGeometry(3, 3, 3), new MeshNormalMaterial());

landingScene.add(box);

export default landingScene;
