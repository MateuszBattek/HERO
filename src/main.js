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
        display.fill(game.world.background);
        display.drawMap(assets_manager.tile_set_image, assets_manager.rest_map_image, game.world.top_coords, game.world.width, game.world.height, 0, game.world.source_y);
        display.drawTimebar(assets_manager.rest_map_image, 288, 661, Math.round((1315 * game.world.time_limit) / 128), 25);
        if (game.world.bomb) {
            var bomb_frame = game.world.tile_set.bomb_frames[game.world.bomb.frame_value];
            display.drawObject(assets_manager.rest_map_image, bomb_frame.x, bomb_frame.y, game.world.bomb.x, game.world.bomb.y, bomb_frame.width, bomb_frame.height, bomb_frame.width, bomb_frame.height);
        }
        //monsters
        for (var i = 0; i < game.world.monsters.length; i++) {
            if (game.world.monsters[i].alive) {
                switch (game.world.monsters[i].type) {
                    case "spider":
                        var spider_frame = game.world.tile_set.spider_frames[game.world.monsters[i].frame_value];
                        display.drawObject(assets_manager.monsters_image, spider_frame.x, spider_frame.y, game.world.monsters[i].x, game.world.monsters[i].y, spider_frame.width, spider_frame.height, spider_frame.width, spider_frame.height);
                }
            }
        }
        var helicopter_frame = game.world.tile_set.helicopter_frames[game.world.player.helicopter.frame_value];
        display.drawObject(assets_manager.hero_image, helicopter_frame.x, helicopter_frame.y, game.world.player.helicopter.x, game.world.player.helicopter.y, helicopter_frame.width, helicopter_frame.height, 48, 13);
        var player_frame = game.world.tile_set.player_frames[game.world.player.frame_value];
        display.drawObject(assets_manager.hero_image, player_frame.x, player_frame.y, game.world.player.x, game.world.player.y, player_frame.width, player_frame.height, 69, 97);
        //lives
        for (var i = 0; i < game.world.lives - 1; i++) {
            display.drawObject(assets_manager.rest_map_image, 0, 413, 190 + i * 100, 696, 60, 68, 60, 68);
        }
        //bombs
        for (var i = 0; i < game.world.bombs; i++) {
            display.drawObject(assets_manager.rest_map_image, 142, 413, 1031 + i * 100, 696, 42, 62, 42, 62);
        }
        //walls
        for (var i = 0; i < game.world.walls.length; i++) {
            if (game.world.walls[i].active) {
                display.drawObject(assets_manager.rest_map_image, 60, 413, game.world.walls[i].x, game.world.walls[i].y, game.world.walls[i].width, game.world.walls[i].height, game.world.walls[i].width, game.world.walls[i].height);
            }
        }
        display.render();
    };
    var update = function () {
        if (game.world.player.alive) {
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
            if (controller.down.active) {
                game.world.placeBomb();
                controller.down.active = false;
            }
        }
        if (game.world.door || game.world.reset) {
            game.world.reset = false;
            engine.stop();
            assets_manager.requestJSON("../levels.json", function (file) {
                if (game.world.door) {
                    console.log(game.world.door.destination_zone);
                    game.world.setup(file.levels[0].zones[+game.world.door.destination_zone]);
                }
                else {
                    game.world.setupLevel(file.levels[0]);
                    game.world.setup(file.levels[0].zones[0]);
                }
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
    assets_manager.requestJSON("../levels.json", function (file) {
        game.world.setupLevel(file.levels[0]);
        game.world.setup(file.levels[0].zones[0]);
        assets_manager.loadTileSetImage("images/mapka.png", "images/restmap.png", "images/hero.png", "images/monsters.png", function () {
            resize();
            engine.start();
        });
    });
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);
});
