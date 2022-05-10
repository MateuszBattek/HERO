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
    console.log(
      document.documentElement.clientWidth - 32,
      document.documentElement.clientHeight - 32
    );
    display.render();
  };

  let render = function (): void {
    display.fill(game.world.background_color);
    display.drawRectangle(
      game.world.player.x,
      game.world.player.y,
      game.world.player.width,
      game.world.player.height,
      game.world.player.color
    );
    display.render();
  };

  let update = function (): void {
    if (controller.left.active) {
      game.world.player.moveLeft();
    }
    if (controller.right.active) {
      game.world.player.moveRight();
    }
    if (controller.up.active) {
      game.world.player.fly();
      //controller.up.active = false;
    }

    game.update();
  };

  let controller = new Controller();
  let display = new Display(document.querySelector("canvas")!);
  let game = new Game();
  let engine = new Engine(1000 / 30, render, update);

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);

  resize();

  engine.start();
});
