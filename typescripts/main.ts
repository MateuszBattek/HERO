import { Controller } from "./controller";
import { Display } from "./display";
import { Engine } from "./engine";
import { Game } from "./game";
import { AssetsManager } from "./assetsManager";

window.addEventListener("load", function () {
  let keyDownUp = function (event: KeyboardEvent): void {
    controller.keyDownUp(event.type, event.code);
  };

  let resize = function (): void {
    display.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      game.world.height / game.world.width
    );
    display.render();
  };

  let render = function (): void {
    display.drawMap(
      //display.tile_sheet.image,
      assets_manager.tile_set_image,
      game.world.tile_set.columns,
      game.world.map,
      game.world.columns,
      game.world.tile_set.tile_width,
      game.world.tile_set.tile_height
    );

    let frame = game.world.tile_set.frames[game.world.player.frame_value];

    display.drawObject(
      assets_manager.tile_set_image,
      frame.x,
      frame.y,
      game.world.player.x +
        Math.floor(game.world.player.width * 0.5 - frame.width * 0.5),
      game.world.player.y,
      frame.width,
      frame.height
    );

    //display.drawPlayer(game.world.player, "#555555", "#ffffff");
    display.render();
  };

  let update = function (): void {
    if (controller.left.active || controller.right.active) {
      if (controller.left.active) game.world.player.moveLeft();
      else game.world.player.moveRight();
    } else {
      game.world.player.stop();
    }
    if (controller.up.active) {
      game.world.player.fly();
      //controller.up.active = false;
    } else {
      game.world.player.fall();
    }

    game.update();
  };

  let assets_manager = new AssetsManager();
  let controller = new Controller();
  let display = new Display(document.querySelector("canvas")!);
  let game = new Game();
  let engine = new Engine(1000 / 30, render, update);

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  display.buffer.imageSmoothingEnabled = false;

  // display.tile_sheet.image.addEventListener(
  //   "load",
  //   function () {
  //     resize();

  //     engine.start();
  //   },
  //   { once: true }
  // );

  // display.tile_sheet.image.src = "images/map.png";

  assets_manager.loadTileSetImage("images/map.png", () => {
    resize();
    engine.start();
  });

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);
});
