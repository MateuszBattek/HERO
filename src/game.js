import { World } from "./world";
var Game = /** @class */ (function () {
    function Game() {
        this.world = new World();
    }
    Game.prototype.update = function () {
        this.world.update();
    };
    return Game;
}());
export { Game };
