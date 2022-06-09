import { AppComponent } from "@core/AppComponent";
import { createTaskList } from '@/components/backlog/backlog.template';
import { Store } from '@/store/Store';

export class Backlog extends AppComponent {
  static className = 'backlog';

  constructor($root) {
    super($root, {
      name: 'Backlog',
      listeners: ['dragstart', 'dragend']
    });
  }

  onDragstart(e) {
    setTimeout(() => {
      e.target.classList.add('backlog__item_hidden');
      Store.draggable(e.target.id);
    });
  }

  onDragend(e) {
    e.target.classList.remove('backlog__item_hidden');
  }

  toHTML() {
    return createTaskList();
  }
}