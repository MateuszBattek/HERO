import { Door } from "./door";

export interface Zone {
  doors: Door[];

  columns: number;
  rows: number;

  graphical_map: number[];

  top_coords: number;

  collision_map: number[];

  id: number;
}
