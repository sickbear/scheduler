//import { $ } from '@core/Dom';

// компонент-контейнер
export class Scheduler {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components ?? [];
  }

  #getRoot() {
    const $root = document.createElement('div');
    $root.classList.add('container');

    this.components = this.components.map(Component => {
      const $el = document.createElement('div');
      $el.classList.add(Component.className);
      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $root.append($el);
      return component;
    });
    return $root;
  }

  // отображение объявленных компонентов
  render() {
    document.getElementById('loading').remove();
    this.$el.append(this.#getRoot());
    this.components.forEach(component => component.init())
  }
}
