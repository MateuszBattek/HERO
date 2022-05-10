export class Display {
  buffer: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.buffer = document.createElement("canvas").getContext("2d")!;
    this.context = canvas.getContext("2d")!;
  }

  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
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
