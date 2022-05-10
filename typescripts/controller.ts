export class Controller {
  left: ButtonInput;
  right: ButtonInput;
  up: ButtonInput;

  constructor() {
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
  }

  keyDownUp(type: string, key_code: string) {
    let down = type == "keydown";
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
  }
}

export class ButtonInput {
  active: boolean;
  private down: boolean;

  constructor() {
    this.active = this.down = false;
  }

  getInput(down: boolean) {
    if (this.down != down) this.active = down;
    this.down = down;
  }
}
