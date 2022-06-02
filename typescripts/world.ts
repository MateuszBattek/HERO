import { Bomb } from "./bomb";
import { Bullet } from "./bullet";
import { Collider } from "./collider";
import { Door } from "./door";
import { Player_Sets } from "./frame_sets_interface";
import { Level } from "./level_interface";
import { Monster } from "./monster";
import { Player } from "./player";
import { Score_Bubble } from "./score_bubble_interface";
import { TileSet } from "./tileSet";
import { Wall } from "./wall";
import { Zone } from "./zone_interface";

export class World {
  collider: Collider;

  background: string;

  player_sets: Player_Sets;
  player: Player;

  columns: number;
  rows: number;

  level: number;
  zone: Zone | undefined;
  zones: Zone[];
  zone_id: number;

  walls: Wall[];
  doors: Door[];
  monsters: Monster[];
  monster_index: number;
  door: Door | undefined;
  bomb: Bomb | undefined;

  tile_set: TileSet;

  source_y!: number;
  top_coords!: number;
  collision_map!: number[];
  width: number;
  height: number;

  time: number;
  time_limit: number;

  lives: number;
  bombs: number;

  bullets: Bullet[];

  points: number;
  score_bubble: Score_Bubble | null;

  reset: boolean;

  constructor() {
    this.collider = new Collider();

    this.background = "#000000";
    this.player_sets = {
      "fly-right": [0],
      "walk-right": [1, 2, 3, 4, 5],
      "idle-right": [6],
      "fly-left": [7],
      "walk-left": [8, 9, 10, 11, 12],
      "idle-left": [13],
      dead: [14],
    };
    (this.player = new Player(300, 19, this.player_sets)), (this.columns = 10);
    this.rows = 6;

    this.level = 1;
    this.zone = undefined;
    this.zones = [];
    this.zone_id = 0;

    this.walls = [];
    this.monsters = [];
    this.monster_index = -1;

    this.doors = [];
    this.door = undefined;

    this.bullets = [];

    this.tile_set = new TileSet(10, 164, 95);

    this.height = this.tile_set.tile_height * this.rows + 369;
    this.width = this.tile_set.tile_width * this.columns;

    this.time = Date.now();
    this.time_limit = 128;

    this.lives = 4;
    this.bombs = 6;
    this.bomb = undefined;

    this.points = 0;

    this.score_bubble = null;

    this.reset = false;
  }

  collideObject(object: Player): void {
    if (this.zone_id == 0) {
      if (object.getTop() < 19) {
        object.setTop(19);
        object.velocity_y = 0;
      }
    }

    let bottom, left, right, top, value: number;

    top = Math.floor((object.getTop() - 19) / this.tile_set.tile_height);
    left = Math.floor(object.getLeft() / this.tile_set.tile_width);
    value = this.collision_map[top * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tile_set.tile_width,
      top * this.tile_set.tile_height,
      this.tile_set.tile_width,
      this.tile_set.tile_height
    );

    top = Math.floor((object.getTop() - 19) / this.tile_set.tile_height);
    right = Math.floor(object.getRight() / this.tile_set.tile_width);
    value = this.collision_map[top * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tile_set.tile_width,
      top * this.tile_set.tile_height,
      this.tile_set.tile_width,
      this.tile_set.tile_height
    );

    bottom = Math.floor((object.getBottom() - 19) / this.tile_set.tile_height);
    left = Math.floor(object.getLeft() / this.tile_set.tile_width);
    value = this.collision_map[bottom * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tile_set.tile_width,
      bottom * this.tile_set.tile_height,
      this.tile_set.tile_width,
      this.tile_set.tile_height
    );

    bottom = Math.floor((object.getBottom() - 19) / this.tile_set.tile_height);
    right = Math.floor(object.getRight() / this.tile_set.tile_width);
    value = this.collision_map[bottom * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tile_set.tile_width,
      bottom * this.tile_set.tile_height,
      this.tile_set.tile_width,
      this.tile_set.tile_height
    );
  }

  setupLevel(level: Level) {
    this.level = level.id;
    this.zones = level.zones;
  }

  setup(zone: Zone) {
    //Get the new tile maps, the new zone, and reset the doors array.
    this.zone = this.zones[zone.id];
    this.zone_id = zone.id;

    this.source_y = this.zone.source_y;
    this.top_coords = this.zone.top_coords;
    this.collision_map = this.zone.collision_map;
    this.columns = this.zone.columns;
    this.rows = this.zone.rows;
    this.walls = new Array();
    this.doors = new Array();
    this.monsters = new Array();
    this.zone_id = this.zone.id;

    //Generate new doors.
    for (let index = zone.doors.length - 1; index > -1; --index) {
      let door = this.zone.doors[index];
      this.doors[index] = new Door(door);
    }

    for (let index = zone.walls.length - 1; index > -1; --index) {
      let wall = this.zone.walls[index];
      if (wall && wall.active) this.walls[index] = new Wall(wall);
    }

    for (let index = zone.monsters.length - 1; index > -1; --index) {
      let monster = this.zone.monsters[index];
      if (monster && monster.alive) this.monsters[index] = new Monster(monster);
    }

    if (this.door) {
      if (this.door.destination_x != -1) {
        this.player.setCenterX(this.door.destination_x);
        this.player.setOldCenterX(this.door.destination_x); // It's important to reset the old position as well.
      }

      if (this.door.destination_y != -1) {
        this.player.setCenterY(this.door.destination_y);
        this.player.setOldCenterY(this.door.destination_y);
      }

      this.door = undefined; // Make sure to reset this.door so we don't trigger a zone load.
    }
  }

  placeBomb() {
    if (!this.player.flying && !this.bomb && this.bombs > 0) {
      this.bomb = new Bomb(this.player.getCenterX(), this.player.getBottom());
      this.bombs--;
    }
  }

  fire() {
    let bullet = new Bullet(
      this.player.direction_x == 1
        ? this.player.getRight()
        : this.player.getLeft() - 50,
      this.player.getTop() + 10,
      this.player.direction_x
    );
    this.bullets.push(bullet);
  }

  checkTimeLimit() {
    if (
      Date.now() - this.time >= 1000 &&
      this.time_limit > 0 &&
      this.player.alive
    ) {
      this.time = Date.now();
      this.time_limit--;
      if (this.time_limit == 0) {
        this.player.die();
        this.lives--;
      }
    }
  }

  resetGame() {
    this.level = 1;
    this.zone_id = 0;
    this.walls = [];
    this.doors = [];
    this.door = undefined;
    this.lives = 4;
    this.bombs = 6;
    this.time = Date.now();

    this.player.x = 300;
    this.player.y = 19;
    this.player.direction_x = 1;

    this.reset = true;
    this.time_limit = 128;
  }

  reviveCooldown() {
    if (Date.now() - this.time >= 3000) {
      if (this.monster_index >= 0) {
        this.monsters[this.monster_index].alive = false;
        //this.monsters.splice(this.monster_index);
        this.monster_index = -1;
      }

      if (this.lives == 0) {
        this.resetGame();
      }

      this.player.revive();
    }
  }

  bombExplode() {
    if (!this.player.flying) {
      if (
        Math.abs(
          this.bomb!.x + this.bomb!.width / 2 - this.player.getCenterX()
        ) <= 100 &&
        Math.abs(this.bomb!.y - this.player.y) <= 200
      ) {
        this.player.die();
        this.lives--;
      }
    }
    for (let i = 0; i < this.walls.length; i++) {
      let wall = this.walls[i];
      if (!wall.active) continue;
      if (
        Math.abs(
          this.bomb!.x + this.bomb!.width / 2 - wall.x + wall.width / 2
        ) <= 100 &&
        Math.abs(this.bomb!.y - wall.y) <= 200
      ) {
        this.points += 75;
        wall.active = false;
        this.score_bubble = {
          type: 0,
          x: this.bomb!.x,
          y: this.bomb!.y,
          time: Date.now(),
        };
      }
    }
  }

  bombAnimate() {
    if (this.bomb) {
      this.bomb.animate();
      let time_since_placed = Date.now() - this.bomb.time;

      if (time_since_placed >= 700) {
        this.bomb.changeFrameSet([3], "pause");
        if (time_since_placed >= 740) {
          this.bomb.changeFrameSet([4], "pause");
          if (time_since_placed >= 760) {
            this.background = "#6f4f24";
            if (time_since_placed >= 780) {
              this.background = "#67362b";
              if (time_since_placed >= 800) {
                this.background = "#000000";
                this.bombExplode();
                this.bomb = undefined;
              }
            }
          }
        }
      }
    }
  }

  update() {
    this.checkTimeLimit();
    this.reviveCooldown();

    this.player.updatePosition();
    this.collideObject(this.player);

    for (let index = this.walls.length - 1; index > -1; --index) {
      let wall = this.walls[index];

      if (wall.collideObject(this.player)) {
      }
    }

    for (let index = this.doors.length - 1; index > -1; --index) {
      let door = this.doors[index];

      if (door.collideObject(this.player)) {
        this.zones[this.zone_id].doors = this.doors;
        this.zones[this.zone_id].walls = this.walls;
        this.zones[this.zone_id].monsters = this.monsters;
        this.door = door;
      }
    }

    for (let index = this.monsters.length - 1; index > -1; --index) {
      let monster = this.monsters[index];

      monster.animate();
      monster.updatePosition();

      if (monster.collideObject(this.player) && this.player.alive) {
        this.lives--;
        this.player.die();
        this.monster_index = index;
        break;
      }
    }

    for (let index = this.bullets.length - 1; index > -1; --index) {
      let bullet = this.bullets[index];
      bullet.y = this.player.getTop() + 10;
      bullet.move(index);

      if (bullet.moves >= 4) {
        this.bullets.splice(this.bullets.indexOf(bullet));
      }
    }

    for (let index = this.bullets.length - 1; index > -1; --index) {
      let bullet = this.bullets[index];

      for (let index = this.monsters.length - 1; index > -1; --index) {
        let monster = this.monsters[index];

        if (monster.collideObject(bullet)) {
          this.monsters[this.monsters.indexOf(monster)].alive = false;
          this.points += 50;
          this.score_bubble = {
            type: 1,
            x: monster.x,
            y: monster.y,
            time: Date.now(),
          };
          //this.monsters.splice(this.monsters.indexOf(monster));
          break;
        }
      }
    }

    if (this.score_bubble) {
      if (Date.now() - this.score_bubble.time >= 1500) this.score_bubble = null;
    }

    this.player.updateAnimation();

    this.bombAnimate();
  }
}
