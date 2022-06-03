import { World } from "./world";
var Game = /** @class */ (function () {
    function Game(audioArray) {
        this.world = new World(audioArray);
    }
    Game.prototype.update = function () {
        this.world.update();
    };
    return Game;
}());
export { Game };
