export class AssetsManager {
  tile_set_image: HTMLImageElement;
  rest_map_image: HTMLImageElement;
  hero_image: HTMLImageElement;
  currentZoneId: string;

  constructor() {
    this.tile_set_image = new Image();
    this.rest_map_image = new Image();
    this.hero_image = new Image();
    this.currentZoneId = "0";
  }

  loadTileSetImage(
    tile_url: string,
    rest_map_url: string,
    hero_url: string,
    callback: Function
  ) {
    //this.tile_set_image = new Image();

    let imgs = [this.tile_set_image, this.rest_map_image, this.hero_image];
    let counter = 0;

    [].forEach.call(imgs, function (img: HTMLImageElement) {
      if (img.complete) {
        counter++;
        if (counter == imgs.length) {
          callback();
        }
      } else
        img.addEventListener(
          "load",
          function () {
            counter++;
            if (counter == imgs.length) {
              callback();
            }
          },
          false
        );
    });
    // this.tile_set_image.addEventListener(
    //   "load",
    //   function () {
    //     callback();
    //   },
    //   { once: true }
    // );

    this.tile_set_image.src = tile_url;
    this.rest_map_image.src = rest_map_url;
    this.hero_image.src = hero_url;
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
