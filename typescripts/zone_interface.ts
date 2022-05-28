import { Door } from "./door";

export interface Zone {
  doors: Door[];

  columns: number;
  rows: number;

  graphical_map: number[];

  collision_map: number[];

  id: string;
}
