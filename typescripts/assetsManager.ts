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

  /* Requests a file and hands the callback function the contents of that file
     parsed by JSON parse. */
  requestJSON(url: string, callback: Function) {
    let request = new XMLHttpRequest();

    request.addEventListener(
      "load",
      function () {
        callback(JSON.parse(this.responseText));
      },
      { once: true }
    );

    request.open("GET", url);
    request.send();
  }

  
}
