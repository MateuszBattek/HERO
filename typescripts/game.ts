interface World {
  background_color: string;

  friction: number;
  old_flying_loader: number;

  player: Player;

  height: number;
  width: number;

  collideObject: Function;
  update: Function;
}

export class Game {
  world: World;

  constructor() {
    this.world = {
      background_color: "rgb(40, 48, 56)",

      friction: 0.8,
      old_flying_loader: 0,

      player: new Player(),

      height: 72,
      width: 128,

      collideObject: function (object: Player) {
        if (object.x < 0) {
          object.x = 0;
          object.velocity_x = 0;
        } else if (object.x + object.width > this.width) {
          object.x = this.width - object.width;
          object.velocity_x = 0;
        }
        if (object.y < 0) {
          object.y = 0;
          object.velocity_y = 0;
        } else if (object.y + object.height > this.height) {
          object.flying = false;
          object.y = this.height - object.height;
          object.velocity_y = 0;
        }
      },

      update: function () {
        //this.player.velocity_y += this.gravity;

        this.player.velocity_x *= this.friction;
        //this.player.velocity_y *= this.friction;

        this.player.update();

        this.collideObject(this.player);
        console.log(this.player.velocity_y);
      },
    };
  }

  update() {
    this.world.update();
  }
}

export class Player {
  color: string;
  width: number;
  height: number;
  flying: boolean;
  velocity_x: number;
  velocity_y: number;
  x: number;
  y: number;
  flying_loader: number;

  constructor() {
    this.color = "#ff0000";
    this.width = 12;
    this.height = 12;
    this.flying = true;
    this.velocity_x = 0;
    this.velocity_y = 2;
    this.x = 100;
    this.y = 72;
    this.flying_loader = 0;
  }

  fly() {
    this.flying = true;
    if (this.flying_loader < 1) this.flying_loader += 0.04;
    else this.velocity_y = -2;
    //this.velocity_y -= 2;
  }

  moveLeft() {
    this.velocity_x -= 0.5;
  }

  moveRight() {
    this.velocity_x += 0.5;
  }

  update() {
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  }
}
