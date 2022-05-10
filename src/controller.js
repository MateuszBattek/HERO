var Controller = /** @class */ (function () {
    function Controller() {
        this.left = new ButtonInput();
        this.right = new ButtonInput();
        this.up = new ButtonInput();
    }
    Controller.prototype.keyDownUp = function (type, key_code) {
        var down = type == "keydown";
        switch (key_code) {
            case "ArrowLeft":
                this.left.getInput(down);
                break;
            case "ArrowUp":
                this.up.getInput(down);
                break;
            case "ArrowRight":
                this.right.getInput(down);
        }
    };
    return Controller;
}());
export { Controller };
var ButtonInput = /** @class */ (function () {
    function ButtonInput() {
        this.active = this.down = false;
    }
    ButtonInput.prototype.getInput = function (down) {
        if (this.down != down)
            this.active = down;
        this.down = down;
    };
    return ButtonInput;
}());
export { ButtonInput };
