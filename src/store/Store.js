import { getData } from '@core/api';
import { getDates, formatDate } from '@core/utils';

export class Store {
  static get data() {
    return window.store.data;
  }

  static get dragged() {
    return window.store.data.draggable;
  }

  static draggable($el) {
    window.store.data.draggable = $el;
  }

  async getStore() {
    const apiUsers = await getData('https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users');
    const apiTasks = await getData('https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks');

    const apiData = {
      apiUsers,
      apiTasks
    }

    this.#setStore(apiData);
  }

  #getDataArrays({ apiUsers, apiTasks }) {
    const tasks = [];
    apiUsers.map(user => {
      user.tasks = [];
    });

    apiTasks.forEach((task, i) => {
      if (task.executor && typeof task.executor === 'number') {
        apiUsers.forEach((user, i) => {
          if (user.id === task.executor) {
            apiUsers[i].tasks.push({
              id: task.id,
              subject: task.subject,
              startDate: formatDate(task.planStartDate),
              endDate: formatDate(task.planEndDate),
              timestamp: + new Date(task.planEndDate)
            });
          }
        });
      } else {
        tasks.push(task);
      }
    });

    return {
      users: apiUsers,
      tasks
    }
  }

  #setStore(apiData) {
    const data = this.#getDataArrays(apiData);

    window.store = {}
    window.store.data = data;
    window.store.data.dates = getDates();
    window.store.data.now = + new Date();
    window.store.data.draggable = null;
  }
}
