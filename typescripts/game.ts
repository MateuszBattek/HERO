import { World } from "./world";

export class Game {
  world: World;

  constructor() {
    this.world = new World();
  }

  update() {
    this.world.update();
  }
}
