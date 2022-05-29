import { Collider } from "./collider";
import { Door } from "./door";
import { Player_Sets } from "./frame_sets_interface";
import { Player } from "./player";
import { TileSet } from "./tileSet";
import { Zone } from "./zone_interface";

export class World {
  collider: Collider;

  player_sets: Player_Sets;
  player: Player;

  columns: number;
  rows: number;

  level: string;
  zone_id: number;
  doors: Door[];
  door: Door | undefined;

  tile_set: TileSet;

  graphical_map!: number[];
  top_coords!: number;
  collision_map!: number[];
  width: number;
  height: number;

  constructor() {
    this.collider = new Collider();
    this.player_sets = {
      "fly-right": [0],
      "walk-right": [1, 2, 3, 4, 5],
      "idle-right": [6],
      "fly-left": [7],
      "walk-left": [8, 9, 10, 11, 12],
      "idle-left": [13],
    };
    (this.player = new Player(300, 19, this.player_sets)), (this.columns = 10);
    this.rows = 6;

    this.level = "1";
    this.zone_id = 0;

    this.doors = [];
    this.door = undefined;

    this.tile_set = new TileSet(10, 164, 95);

    this.height = this.tile_set.tile_height * this.rows + 369;
    this.width = this.tile_set.tile_width * this.columns;
  }

  collideObject(object: Player): void {
    /* Let's make sure we can't leave the world boundaries. */
    // if (object.getLeft() < 0) {
    //   object.setLeft(0);
    //   object.velocity_x = 0;
    // } else if (object.getRight() > this.width) {
    //   object.setRight(this.width);
    //   object.velocity_x = 0;
    // }
    if (this.zone_id == 0) {
      if (object.getTop() < 19) {
        object.setTop(19);
        object.velocity_y = 0;
      }
    }
    // else if (
    //   object.getBottom() >
    //   this.tile_set.tile_height * this.rows + 19
    // ) {
    //   object.setBottom(this.tile_set.tile_height * this.rows + 19);
    //   object.velocity_y = 0;
    //   object.flying = false;
    // }

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

  setup(zone: Zone) {
    //Get the new tile maps, the new zone, and reset the doors array.
    this.graphical_map = zone.graphical_map;
    this.top_coords = zone.top_coords;
    this.collision_map = zone.collision_map;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.doors = new Array();
    this.zone_id = zone.id;

    //Generate new doors.
    for (let index = zone.doors.length - 1; index > -1; --index) {
      let door = zone.doors[index];
      this.doors[index] = new Door(door);
    }

    /* If the player entered into a door, this.door will reference that door.
       Here it will be used to set player's location to the door's destination. */
    if (this.door) {
      /* If a destination is equal to -1, that means it won't be used. Since
         each zone spans from 0 to its width and height, any negative number would
         be invalid. If a door's destination is -1, the player will keep his current
         position for that axis. */
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

  update() {
    this.player.updatePosition();
    this.collideObject(this.player);

    for (let index = this.doors.length - 1; index > -1; --index) {
      let door = this.doors[index];

      if (door.collideObject(this.player)) {
        this.door = door;
      }
    }

    this.player.updateAnimation();
  }
}
