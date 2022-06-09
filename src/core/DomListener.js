import { capitalize } from '@core/utils';

// основной компонент ядра
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Не передан элемент dom для DomListener');
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  addDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const className = this.name ?? '';
        throw new Error(`В классе ${className} не найден метод ${method}!`);
      }
      this[method] = this[method].bind(this);
      this.$root.addEventListener(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.removeEventListener(this.listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}