import { Group, GridHelper, AxesHelper } from "three";

export default class HelpersManager {
  helpersGroup = new Group();
  constructor() {
    this.helpersGroup.name = "helpers";
    this.addHelpers();
  }

  addHelpers() {
    const gridHelper = new GridHelper(10, 10);
    const axesHelper = new AxesHelper(5);
    this.helpersGroup.add(gridHelper, axesHelper);
  }

  // Add other helper methods here if needed
}
