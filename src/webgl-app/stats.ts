import Stats from "three/examples/jsm/libs/stats.module.js";
import { RendererStats } from "./threex.renderstats";

//export default rendererStats;
export const stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
///
// stats.dom.style.position = "absolute";
// stats.dom.style.right = "0px";
///
document.body.appendChild(stats.dom);

//export default stats;
export const rendererStats = new RendererStats();
rendererStats.domElement.style.position = "absolute";
rendererStats.domElement.style.top = "45px";
rendererStats.domElement.style.left = "0px";
document.body.appendChild(rendererStats.domElement);
