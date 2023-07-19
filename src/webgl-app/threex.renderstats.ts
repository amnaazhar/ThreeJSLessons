/**
 * @author mrdoob / http://mrdoob.com/
 * @author jetienne / http://jetienne.com/
 */

import { WebGLRenderer } from "three";

export class RendererStats {
  private container: HTMLDivElement;
  private msDiv: HTMLDivElement;
  private msText: HTMLDivElement;
  private msTexts: HTMLDivElement[] = [];
  private nLines: number = 9;
  private lastTime: number = Date.now();

  constructor() {
    this.container = document.createElement("div");
    this.container.style.cssText = "width:80px;opacity:0.9;cursor:pointer";

    this.msDiv = document.createElement("div");
    this.msDiv.style.cssText =
      "padding:0 0 3px 3px;text-align:left;background-color:#200;";
    this.container.appendChild(this.msDiv);

    this.msText = document.createElement("div");
    this.msText.style.cssText =
      "color:#f00;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    this.msText.innerHTML = "WebGLRenderer";
    this.msDiv.appendChild(this.msText);

    for (let i = 0; i < this.nLines; i++) {
      this.msTexts[i] = document.createElement("div");
      this.msTexts[i].style.cssText =
        "color:#f00;background-color:#311;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
      this.msDiv.appendChild(this.msTexts[i]);
      this.msTexts[i].innerHTML = "-";
    }
  }

  public get domElement(): HTMLDivElement {
    return this.container;
  }

  public update(webGLRenderer: WebGLRenderer): void {
    // Sanity check
    console.assert(webGLRenderer instanceof WebGLRenderer);

    // Refresh only 30 times per second
    if (Date.now() - this.lastTime < 1000 / 30) return;
    this.lastTime = Date.now();

    const info = webGLRenderer.info;
    let i = 0;
    this.msTexts[i++].textContent = "== Content =====";
    this.msTexts[i++].textContent = "Programs: " + info.programs?.length;
    this.msTexts[i++].textContent = "Geometries: " + info.memory.geometries;
    this.msTexts[i++].textContent = "Textures: " + info.memory.textures;

    this.msTexts[i++].textContent = "== Render =====";
    this.msTexts[i++].textContent = "Calls: " + info.render.calls;
    this.msTexts[i++].textContent = "Triangles: " + info.render.triangles;
    this.msTexts[i++].textContent = "Lines: " + info.render.lines;
    this.msTexts[i++].textContent = "Points: " + info.render.points;

    // this.msTexts[i++].textContent = "== System =====";
    // this.msTexts[i++].textContent = "Memory: " + info.memory;
  }
}
