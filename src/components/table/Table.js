import { AppComponent } from "@core/AppComponent";
import { createTable, createInsertedTask } from '@/components/table/table.template';
import { Store } from '@/store/Store';
import { formatDate } from '@core/utils';

export class Table extends AppComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['dragover', 'dragenter', 'drop', 'click']
    });
  }

  #getTask(id) {
    return Store.data.tasks.find(task => {
      if (task.id === id) {
        return {
          task
        };
      }
    });
  }

  #delTask(id) {
    const logTask = document.getElementById(id);
    if (logTask) logTask.remove();
  }

  onDragover(e) {
    e.preventDefault();
  }

  onDragenter(e) {
    e.preventDefault();
  }

  onDrop(e) {
    const id = Store.dragged;

    if (e.target.classList.contains('cell')) {
      const taskData = this.#getTask(id);
      const html = createInsertedTask(taskData);
      e.target.append(html);
      this.#delTask(id);
    } else if (e.target.classList.contains('row__info')) {
      const userId = e.target.id;
      const taskData = this.#getTask(id);
      const taskDeadline = formatDate(taskData.planStartDate);
      const cell = document.getElementById(`${userId}-${taskDeadline}`);
      if (cell) {
        const html = createInsertedTask(taskData);
        cell.append(html);
        this.#delTask(id);
      }
    }
  }

  onClick(e) {
    if (e.target.id === 'left') {
      console.log(e.target.id);
    } else if (e.target.id === 'right') {
      console.log(e.target.id);
    }
  }

  toHTML() {
    return createTable();
  }
}