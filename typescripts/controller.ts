export class Controller {
  left: ButtonInput;
  right: ButtonInput;
  up: ButtonInput;
  down: ButtonInput;
  ctrl: ButtonInput;
  f2: ButtonInput;

  constructor() {
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
    this.down = new ButtonInput();
    this.ctrl = new ButtonInput();
    this.f2 = new ButtonInput();
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
        break;
      case "ArrowDown":
        this.down.getInput(down);
        break;
      case "ControlLeft":
        this.ctrl.getInput(down);
        break;
      case "F2":
        this.f2.getInput(down);
        break;
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
