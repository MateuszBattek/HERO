import { Controller } from "./controller";
import { Display } from "./display";
import { Engine } from "./engine";
import { Game } from "./game";
import { AssetsManager } from "./assetsManager";
window.addEventListener("load", function () {
    "use strict";
    var keyDownUp = function (event) {
        controller.keyDownUp(event.type, event.code);
    };
    var resize = function () {
        display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
        display.render();
    };
    var render = function () {
        display.drawMap(assets_manager.tile_set_image, game.world.tile_set.columns, game.world.graphical_map, game.world.columns, game.world.tile_set.tile_width, game.world.tile_set.tile_height);
        var helicopter_frame = game.world.tile_set.helicopter_frames[game.world.player.helicopter.frame_value];
        display.drawObject(assets_manager.tile_set_image, helicopter_frame.x, helicopter_frame.y, game.world.player.helicopter.x, game.world.player.helicopter.y, helicopter_frame.width, helicopter_frame.height, 48, 13);
        var player_frame = game.world.tile_set.player_frames[game.world.player.frame_value];
        display.drawObject(assets_manager.tile_set_image, player_frame.x, player_frame.y, game.world.player.x, game.world.player.y, player_frame.width, player_frame.height, 69, 97);
        //display.drawPlayer(game.world.player, "#555555", "#ffffff");
        display.render();
    };
    var update = function () {
        if (controller.left.active || controller.right.active) {
            if (controller.left.active)
                game.world.player.moveLeft();
            else
                game.world.player.moveRight();
        }
        else {
            game.world.player.stop();
        }
        if (controller.up.active) {
            game.world.player.fly();
            //controller.up.active = false;
        }
        else {
            game.world.player.fall();
        }
        if (game.world.door) {
            engine.stop();
            assets_manager.requestJSON("../levels.json", function (file) {
                game.world.setup(file.levels[0].zones[0]);
                engine.start();
            });
        }
        game.update();
    };
    var assets_manager = new AssetsManager();
    var controller = new Controller();
    var display = new Display(document.querySelector("canvas"));
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.buffer.imageSmoothingEnabled = true;
    // display.tile_sheet.image.addEventListener(
    //   "load",
    //   function () {
    //     resize();
    //     engine.start();
    //   },
    //   { once: true }
    // );
    // display.tile_sheet.image.src = "images/map.png";
    assets_manager.requestJSON("../levels.json", function (file) {
        game.world.setup(file.levels[0].zones[0]);
        assets_manager.loadTileSetImage("images/map.png", function () {
            resize();
            engine.start();
        });
    });
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);
});
