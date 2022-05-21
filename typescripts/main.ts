import { Controller } from "./controller";
import { Display } from "./display";
import { Engine } from "./engine";
import { Game } from "./game";

window.addEventListener("load", function () {
  let keyDownUp = function (event: KeyboardEvent): void {
    controller.keyDownUp(event.type, event.code);
  };

  let resize = function (): void {
    display.resize(
      document.documentElement.clientWidth - 32,
      document.documentElement.clientHeight - 32,
      game.world.height / game.world.width
    );
    display.render();
  };

  let render = function (): void {
    display.drawMap(game.world.map, game.world.columns);
    display.drawPlayer(
      game.world.player,
      game.world.player.color1,
      game.world.player.color2
    );
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

  let controller = new Controller();
  let display = new Display(document.querySelector("canvas")!);
  let game = new Game();
  let engine = new Engine(1000 / 30, render, update);

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  display.tile_sheet.image.addEventListener(
    "load",
    function () {
      resize();

      engine.start();
    },
    { once: true }
  );

  display.tile_sheet.image.src = "images/map.png";

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);
});
