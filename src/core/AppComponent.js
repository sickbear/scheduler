import { DomListener } from "@core/DomListener";

// родительский класс для компонентов
export class AppComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
  }

  toHTML() {
    return '';
  }

  init() {
    this.addDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}