import { Player } from "./player";
import { TileSheet } from "./tileSheet";

export class Display {
  buffer: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;
  tile_sheet: TileSheet;

  constructor(canvas: HTMLCanvasElement) {
    this.buffer = document.createElement("canvas").getContext("2d")!;
    this.context = canvas.getContext("2d")!;
    this.tile_sheet = new TileSheet(164, 95, 10);
  }

  // drawPlayer(rectangle: Player, color1: string, color2: string) {
  //   this.buffer.fillStyle = color1;
  //   this.buffer.fillRect(
  //     Math.round(rectangle.x),
  //     Math.round(rectangle.y),
  //     rectangle.width,
  //     rectangle.height
  //   );
  //   this.buffer.fillStyle = color2;
  //   this.buffer.fillRect(
  //     Math.round(rectangle.x + 20),
  //     Math.round(rectangle.y + 20),
  //     rectangle.width - 40,
  //     rectangle.height - 40
  //   );
  // }

  drawObject(
    image: HTMLImageElement,
    source_x: number,
    source_y: number,
    destination_x: number,
    destination_y: number,
    width: number,
    height: number
  ) {
    this.buffer.drawImage(
      image,
      source_x,
      source_y,
      width,
      height,
      Math.round(destination_x),
      Math.round(destination_y),
      80,
      90
    );
  }

  drawMap(
    image: HTMLImageElement,
    image_columns: number,
    map: number[],
    map_columns: number,
    tile_width: number,
    tile_height: number
  ) {
    //top
    this.buffer.drawImage(image, 0, 475, 1640, 19, 0, 0, 1640, 19);

    //map
    for (let index = 0; index <= map.length - 1; index++) {
      let value = map[index];
      let source_x = (value % image_columns) * tile_width;
      let source_y = Math.floor(value / image_columns) * tile_height;
      let destination_x = (index % map_columns) * tile_width;
      let destination_y = Math.floor(index / map_columns) * tile_height;
      this.buffer.drawImage(
        image,
        source_x,
        source_y,
        tile_width,
        tile_height,
        destination_x,
        destination_y + 19,
        tile_width,
        tile_height
      );
    }

    //bottom
    this.buffer.drawImage(image, 0, 494, 1640, 31, 0, 589, 1640, 31);

    //info_box
    this.buffer.drawImage(image, 0, 525, 1640, 260, 0, 620, 1640, 260);

    //footer
    this.buffer.drawImage(image, 0, 785, 1640, 59, 0, 880, 1640, 59);
  }

  fill(color: string) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  }

  render() {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  resize(width: number, height: number, height_width_ratio: number) {
    if (height / width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;
    }

    this.context.imageSmoothingEnabled = false;
  }
}
