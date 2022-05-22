export class AssetsManager {
  tile_set_image: HTMLImageElement;

  constructor() {
    this.tile_set_image = new Image();
  }

  loadTileSetImage(url: string, callback: Function) {
    //this.tile_set_image = new Image();

    this.tile_set_image.addEventListener(
      "load",
      function () {
        callback();
      },
      { once: true }
    );

    this.tile_set_image.src = url;
  }
}
