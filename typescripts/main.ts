import { Controller } from "./controller";
import { Display } from "./display";
import { Engine } from "./engine";
import { Game } from "./game";
import { AssetsManager } from "./assetsManager";
import { Level } from "./level_interface";
import { File } from "./file_interface";

window.addEventListener("load", function () {
  "use strict";

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
    display.fill(game.world.background);

    display.drawMap(
      assets_manager.tile_set_image,
      assets_manager.rest_map_image,
      game.world.top_coords,
      game.world.width,
      game.world.height,
      0,
      game.world.source_y
    );

    display.drawTimebar(
      assets_manager.rest_map_image,
      288,
      661,
      Math.round((1315 * game.world.time_limit) / 128),
      25
    );

    if (game.world.bomb) {
      let bomb_frame =
        game.world.tile_set.bomb_frames[game.world.bomb.frame_value];

      display.drawObject(
        assets_manager.rest_map_image,
        bomb_frame.x,
        bomb_frame.y,
        game.world.bomb.x,
        game.world.bomb.y,
        bomb_frame.width,
        bomb_frame.height,
        bomb_frame.width,
        bomb_frame.height
      );
    }

    //monsters
    for (let i = 0; i < game.world.monsters.length; i++) {
      if (game.world.monsters[i].alive) {
        switch (game.world.monsters[i].type) {
          case "spider":
            let spider_frame =
              game.world.tile_set.spider_frames[
                game.world.monsters[i].frame_value
              ];
            display.drawObject(
              assets_manager.monsters_image,
              spider_frame.x,
              spider_frame.y,
              game.world.monsters[i].x,
              game.world.monsters[i].y,
              spider_frame.width,
              spider_frame.height,
              spider_frame.width,
              spider_frame.height
            );
        }
      }
    }

    for (let i = 0; i < game.world.bullets.length; i++) {
      display.drawBullet(game.world.bullets[i], "#978053");
    }

    let helicopter_frame =
      game.world.tile_set.helicopter_frames[
        game.world.player.helicopter.frame_value
      ];

    display.drawObject(
      assets_manager.hero_image,
      helicopter_frame.x,
      helicopter_frame.y,
      game.world.player.helicopter.x,
      game.world.player.helicopter.y,
      helicopter_frame.width,
      helicopter_frame.height,
      48,
      13
    );

    let player_frame =
      game.world.tile_set.player_frames[game.world.player.frame_value];

    display.drawObject(
      assets_manager.hero_image,
      player_frame.x,
      player_frame.y,
      game.world.player.x,
      game.world.player.y,
      player_frame.width,
      player_frame.height,
      69,
      97
    );

    //lives
    for (let i = 0; i < game.world.lives - 1; i++) {
      display.drawObject(
        assets_manager.rest_map_image,
        0,
        413,
        190 + i * 100,
        696,
        60,
        68,
        60,
        68
      );
    }

    //bombs
    for (let i = 0; i < game.world.bombs; i++) {
      display.drawObject(
        assets_manager.rest_map_image,
        142,
        413,
        1031 + i * 100,
        696,
        42,
        62,
        42,
        62
      );
    }

    //level
    display.drawScore(
      assets_manager.rest_map_image,
      game.world.level,
      498,
      800,
      800
    );

    //score
    display.drawScore(
      assets_manager.rest_map_image,
      game.world.points,
      1400,
      804,
      0
    );

    //walls
    for (let i = 0; i < game.world.walls.length; i++) {
      if (game.world.walls[i].active) {
        display.drawObject(
          assets_manager.rest_map_image,
          60,
          413,
          game.world.walls[i].x,
          game.world.walls[i].y,
          game.world.walls[i].width,
          game.world.walls[i].height,
          game.world.walls[i].width,
          game.world.walls[i].height
        );
      }
    }

    display.render();
  };

  let update = function (): void {
    if (game.world.player.alive) {
      if (controller.left.active || controller.right.active) {
        if (controller.left.active) game.world.player.moveLeft();
        else game.world.player.moveRight();
      } else {
        game.world.player.stop();
      }
      if (controller.up.active) {
        game.world.player.fly();
      } else {
        game.world.player.fall();
      }
      if (controller.down.active) {
        game.world.placeBomb();
        controller.down.active = false;
      }
      if (controller.ctrl.active) {
        game.world.fire();
      }
    }

    if (game.world.door || game.world.reset) {
      game.world.reset = false;
      engine.stop();
      assets_manager.requestJSON("../levels.json", (file: File) => {
        if (game.world.door) {
          console.log(game.world.door!.destination_zone);
          game.world.setup(
            file.levels[0].zones[+game.world.door!.destination_zone]
          );
        } else {
          game.world.setupLevel(file.levels[0]);
          game.world.setup(file.levels[0].zones[0]);
        }

        engine.start();
      });
    }

    game.update();
  };

  let assets_manager = new AssetsManager();
  let controller = new Controller();
  let display = new Display(
    document.querySelector("canvas")!,
    document.querySelector("video")!
  );
  let game = new Game();
  let engine = new Engine(1000 / 30, render, update);

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  display.buffer.imageSmoothingEnabled = true;

  let startGame = function (): void {
    assets_manager.requestJSON("../levels.json", (file: File) => {
      game.world.setupLevel(file.levels[0]);
      game.world.setup(file.levels[0].zones[0]);

      assets_manager.loadTileSetImage(
        "images/mapka.png",
        "images/restmap.png",
        "images/hero.png",
        "images/monsters.png",
        () => {
          resize();
          engine.start();
        }
      );
    });
  };

  startGame();

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);
});
