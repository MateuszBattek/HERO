import { Door } from "./door";
import { Monster } from "./monster";
import { Wall } from "./wall";
import { Object } from "./object";

export interface Zone {
  doors: Door[];

  walls: Wall[];

  monsters: Monster[];

  columns: number;
  rows: number;

  source_y: number;

  top_coords: number;
  bottom_coords: number;

  collision_map: number[];

  id: number;

  exit?: Object;
}
