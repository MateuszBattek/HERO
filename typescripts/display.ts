export class Display {
  buffer: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.buffer = document.createElement("canvas").getContext("2d")!;
    this.context = canvas.getContext("2d")!;
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
    source_width: number,
    source_height: number,
    width: number,
    height: number
  ) {
    this.buffer.drawImage(
      image,
      source_x,
      source_y,
      source_width,
      source_height,
      Math.round(destination_x),
      Math.round(destination_y),
      width,
      height
    );
  }

  drawMap(
    image: HTMLImageElement,
    rest_image: HTMLImageElement,
    top_coords: number,
    width: number,
    height: number,
    source_x: number,
    source_y: number
  ) {
    //top
    this.buffer.drawImage(
      rest_image,
      0,
      top_coords,
      width,
      19,
      0,
      0,
      width,
      19
    );

    //map
    this.buffer.drawImage(
      image,
      source_x,
      source_y,
      width,
      height,
      0,
      19,
      width,
      height
    );

    //bottom
    this.buffer.drawImage(rest_image, 0, 38, width, 31, 0, 589, width, 31);

    //info_box
    this.buffer.drawImage(rest_image, 0, 69, width, 260, 0, 620, width, 260);

    //footer
    this.buffer.drawImage(rest_image, 0, 329, width, 59, 0, 880, width, 59);
  }

  drawTimebar(
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.buffer.drawImage(image, 0, 388, 1315, 25, x, y, width, height);
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

    this.context.imageSmoothingEnabled = true;
  }
}
