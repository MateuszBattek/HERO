export class TileSheet {
  image: HTMLImageElement;
  tile_width: number;
  tile_height: number;
  columns: number;

  constructor(tile_width: number, tile_height: number, columns: number) {
    this.image = new Image();
    this.tile_width = tile_width;
    this.tile_height = tile_height;
    this.columns = columns;
  }
}
