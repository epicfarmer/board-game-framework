export abstract class Menu {
  name: String; // The name of the menu item
  constructor(name) {
    this.name = name;
  }
}

export class MenuItem extends Menu {
  callback: Function; // fn that will be called when MenuItem is clicked

  constructor(name: String, callback: Function) {
    super(name);
    this.callback = callback;
  }
}

export class SubMenu extends Menu {
  children: Menu[];
  constructor(name: String, children: Menu[]) {
    super(name);
    this.children = children;
  }
}
