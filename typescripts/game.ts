import { World } from "./world";

export class Game {
  world: World;

  constructor(audioArray: HTMLAudioElement[]) {
    this.world = new World(audioArray);
  }

  update() {
    this.world.update();
  }
}
