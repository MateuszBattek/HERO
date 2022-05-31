import { Door } from "./door";
import { Wall } from "./wall";

export interface Zone {
  doors: Door[];

  walls: Wall[];

  columns: number;
  rows: number;

  graphical_map: number[];

  top_coords: number;

  collision_map: number[];

  id: number;
}
