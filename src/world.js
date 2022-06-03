import { Bomb } from "./bomb";
import { Bullet } from "./bullet";
import { Collider } from "./collider";
import { Door } from "./door";
import { Monster } from "./monster";
import { Player } from "./player";
import { TileSet } from "./tileSet";
import { Wall } from "./wall";
var World = /** @class */ (function () {
    function World(audioArray) {
        this.collider = new Collider();
        this.audioArray = audioArray;
        this.background = "#000000";
        this.player_sets = {
            "fly-right": [0],
            "walk-right": [1, 2, 3, 4, 5],
            "idle-right": [6],
            "fly-left": [7],
            "walk-left": [8, 9, 10, 11, 12],
            "idle-left": [13],
            dead: [14],
        };
        (this.player = new Player(300, 19, this.player_sets)), (this.columns = 10);
        this.rows = 6;
        this.level = 1;
        this.zone = undefined;
        this.zones = [];
        this.zone_id = 0;
        this.walls = [];
        this.monsters = [];
        this.monster_index = -1;
        this.doors = [];
        this.door = undefined;
        this.bullets = [];
        this.tile_set = new TileSet(10, 164, 95);
        this.height = this.tile_set.tile_height * this.rows + 369;
        this.width = this.tile_set.tile_width * this.columns;
        this.time = Date.now();
        this.time_limit = 128;
        this.lives = 4;
        this.bombs = 6;
        this.bomb = undefined;
        this.points = 0;
        this.score_bubble = null;
        this.exit = undefined;
        this.delay = 0;
        this.block = false;
        this.reset = false;
    }
    World.prototype.collideObject = function (object) {
        if (this.zone_id == 0) {
            if (object.getTop() < 19) {
                object.setTop(19);
                object.velocity_y = 0;
            }
        }
        var bottom, left, right, top, value;
        top = Math.floor((object.getTop() - 19) / this.tile_set.tile_height);
        left = Math.floor(object.getLeft() / this.tile_set.tile_width);
        value = this.collision_map[top * this.columns + left];
        this.collider.collide(value, object, left * this.tile_set.tile_width, top * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
        top = Math.floor((object.getTop() - 19) / this.tile_set.tile_height);
        right = Math.floor(object.getRight() / this.tile_set.tile_width);
        value = this.collision_map[top * this.columns + right];
        this.collider.collide(value, object, right * this.tile_set.tile_width, top * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
        bottom = Math.floor((object.getBottom() - 19) / this.tile_set.tile_height);
        left = Math.floor(object.getLeft() / this.tile_set.tile_width);
        value = this.collision_map[bottom * this.columns + left];
        this.collider.collide(value, object, left * this.tile_set.tile_width, bottom * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
        bottom = Math.floor((object.getBottom() - 19) / this.tile_set.tile_height);
        right = Math.floor(object.getRight() / this.tile_set.tile_width);
        value = this.collision_map[bottom * this.columns + right];
        this.collider.collide(value, object, right * this.tile_set.tile_width, bottom * this.tile_set.tile_height, this.tile_set.tile_width, this.tile_set.tile_height);
    };
    World.prototype.setupLevel = function (level) {
        this.level = level.id;
        this.zones = level.zones;
    };
    World.prototype.setup = function (zone) {
        //Get the new tile maps, the new zone, and reset the doors array.
        this.zone = this.zones[zone.id];
        this.zone_id = zone.id;
        this.score_bubble = null;
        this.source_y = this.zone.source_y;
        this.top_coords = this.zone.top_coords;
        this.bottom_coords = this.zone.bottom_coords;
        this.collision_map = this.zone.collision_map;
        this.columns = this.zone.columns;
        this.rows = this.zone.rows;
        this.walls = new Array();
        this.doors = new Array();
        this.monsters = new Array();
        this.zone_id = this.zone.id;
        if (this.zone.exit)
            this.exit = this.zone.exit;
        else
            this.exit = undefined;
        //Generate new doors.
        for (var index = zone.doors.length - 1; index > -1; --index) {
            var door = this.zone.doors[index];
            this.doors[index] = new Door(door);
        }
        for (var index = zone.walls.length - 1; index > -1; --index) {
            var wall = this.zone.walls[index];
            if (wall && wall.active)
                this.walls[index] = new Wall(wall);
        }
        for (var index = zone.monsters.length - 1; index > -1; --index) {
            var monster = this.zone.monsters[index];
            if (monster && monster.alive)
                this.monsters[index] = new Monster(monster);
        }
        if (this.door) {
            if (this.door.destination_x != -1) {
                this.player.setCenterX(this.door.destination_x);
                this.player.setOldCenterX(this.door.destination_x); // It's important to reset the old position as well.
            }
            if (this.door.destination_y != -1) {
                this.player.setCenterY(this.door.destination_y);
                this.player.setOldCenterY(this.door.destination_y);
            }
            this.door = undefined; // Make sure to reset this.door so we don't trigger a zone load.
        }
    };
    World.prototype.placeBomb = function () {
        if (!this.player.flying && !this.bomb && this.bombs > 0) {
            this.bomb = new Bomb(this.player.getCenterX(), this.player.getBottom());
            this.bombs--;
            this.audioArray[5].play();
        }
    };
    World.prototype.fire = function () {
        var bullet = new Bullet(this.player.direction_x == 1
            ? this.player.getRight()
            : this.player.getLeft() - 50, this.player.getTop() + 10, this.player.direction_x);
        this.bullets.push(bullet);
        this.audioArray[3].play();
    };
    World.prototype.checkTimeLimit = function () {
        if (Date.now() - this.time >= 1000 &&
            this.time_limit > 0 &&
            this.player.alive) {
            this.time = Date.now();
            this.time_limit--;
            if (this.time_limit == 0) {
                this.player.die();
                this.lives--;
            }
        }
    };
    World.prototype.resetGame = function () {
        this.level = 1;
        this.zone_id = 0;
        this.walls = [];
        this.doors = [];
        this.door = undefined;
        this.lives = 4;
        this.bombs = 6;
        this.time = Date.now();
        this.score_bubble = null;
        this.player.x = 300;
        this.player.y = 19;
        this.player.direction_x = 1;
        this.player.flying = true;
        this.reset = true;
        this.time_limit = 128;
    };
    World.prototype.loadLevel = function (level) {
        this.level = level;
        this.zone_id = 0;
        this.walls = [];
        this.doors = [];
        this.door = undefined;
        this.bombs = 6;
        this.time = Date.now();
        this.score_bubble = null;
        this.player.x = 300;
        this.player.y = 19;
        this.player.direction_x = 1;
        this.player.flying = true;
        this.reset = true;
        this.time_limit = 128;
    };
    World.prototype.reviveCooldown = function () {
        if (Date.now() - this.time >= 3000) {
            if (this.monster_index >= 0) {
                this.monsters[this.monster_index].alive = false;
                //this.monsters.splice(this.monster_index);
                this.monster_index = -1;
            }
            if (this.lives == 0) {
                this.resetGame();
            }
            this.player.revive();
            this.loadLevel(this.level);
        }
    };
    World.prototype.bombExplode = function () {
        if (!this.player.flying) {
            if (Math.abs(this.bomb.x + this.bomb.width / 2 - this.player.getCenterX()) <= 150 &&
                Math.abs(this.bomb.y - this.player.y) <= 200) {
                this.player.die();
                this.lives--;
            }
        }
        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            if (!wall.active)
                continue;
            if (Math.abs(this.bomb.x + this.bomb.width / 2 - (wall.x + wall.width / 2)) <= 150 &&
                Math.abs(this.bomb.y - wall.y) <= 200) {
                this.points += 75;
                wall.active = false;
                this.score_bubble = {
                    type: 0,
                    x: this.bomb.x,
                    y: this.bomb.y,
                    time: Date.now(),
                };
            }
        }
        this.audioArray[2].play();
    };
    World.prototype.bombAnimate = function () {
        if (this.bomb) {
            this.bomb.animate();
            var time_since_placed = Date.now() - this.bomb.time;
            if (time_since_placed >= 700) {
                this.bomb.changeFrameSet([3], "pause");
                if (time_since_placed >= 740) {
                    this.bomb.changeFrameSet([4], "pause");
                    if (time_since_placed >= 760) {
                        this.background = "#6f4f24";
                        if (time_since_placed >= 780) {
                            this.background = "#67362b";
                            if (time_since_placed >= 800) {
                                this.background = "#000000";
                                this.bombExplode();
                                this.bomb = undefined;
                            }
                        }
                    }
                }
            }
        }
    };
    World.prototype.checkExit = function () {
        if (this.exit.x + this.exit.width < this.player.getLeft() ||
            this.exit.x > this.player.getRight() ||
            this.exit.y + this.exit.height < this.player.getTop() ||
            this.exit.y > this.player.getBottom())
            return false;
        return true;
    };
    World.prototype.animatePoints = function () {
        if (this.time_limit > 0) {
            if (this.time_limit == 1) {
                this.time_limit -= 1;
                this.points += this.level * 13;
            }
            else {
                this.time_limit -= 2;
                this.points += 2 * this.level * 13;
            }
            this.delay = Date.now();
            this.audioArray[4].play();
        }
        else if (this.bombs > 0) {
            if (Date.now() - this.delay >= 522) {
                this.audioArray[1].play();
                this.bombs--;
                this.points += 50;
                this.delay = Date.now();
            }
        }
        else {
            this.block = false;
            this.loadLevel(++this.level);
        }
    };
    World.prototype.update = function () {
        if (this.exit) {
            if (this.checkExit()) {
                this.points += 1000;
                this.block = true;
                this.exit = undefined;
            }
        }
        if (this.block) {
            this.animatePoints();
        }
        if (!this.block) {
            this.checkTimeLimit();
            this.reviveCooldown();
            this.player.updatePosition();
            this.collideObject(this.player);
            for (var index = this.walls.length - 1; index > -1; --index) {
                var wall = this.walls[index];
                if (wall.collideObject(this.player)) {
                }
            }
            for (var index = this.doors.length - 1; index > -1; --index) {
                var door = this.doors[index];
                if (door.collideObject(this.player)) {
                    this.zones[this.zone_id].doors = this.doors;
                    this.zones[this.zone_id].walls = this.walls;
                    this.zones[this.zone_id].monsters = this.monsters;
                    this.door = door;
                }
            }
            for (var index = this.monsters.length - 1; index > -1; --index) {
                var monster = this.monsters[index];
                monster.animate();
                monster.updatePosition();
                if (monster.collideObject(this.player) && this.player.alive) {
                    this.lives--;
                    this.player.die();
                    this.monster_index = index;
                    break;
                }
            }
            for (var index = this.bullets.length - 1; index > -1; --index) {
                var bullet = this.bullets[index];
                bullet.y = this.player.getTop() + 10;
                bullet.move(index);
                if (bullet.moves >= 4) {
                    this.bullets.splice(this.bullets.indexOf(bullet));
                }
            }
            for (var index = this.bullets.length - 1; index > -1; --index) {
                var bullet = this.bullets[index];
                for (var index_1 = this.monsters.length - 1; index_1 > -1; --index_1) {
                    var monster = this.monsters[index_1];
                    if (monster.collideObject(bullet)) {
                        this.monsters[this.monsters.indexOf(monster)].alive = false;
                        this.points += 50;
                        this.score_bubble = {
                            type: 1,
                            x: monster.x,
                            y: monster.y,
                            time: Date.now(),
                        };
                        //this.monsters.splice(this.monsters.indexOf(monster));
                        break;
                    }
                }
            }
            if (this.score_bubble) {
                if (Date.now() - this.score_bubble.time >= 1500)
                    this.score_bubble = null;
            }
            this.player.updateAnimation();
            this.bombAnimate();
        }
    };
    return World;
}());
export { World };
