import { Store } from '@/store/Store';

function createTask(id, name, text) {
  const nameTask = name ?? 'Неизвестное имя';
  const textTask = text ?? 'Нет даты';

  return `
    <div class="backlog__item" draggable="true" id="${id}">
      <p class="backlog__name">${nameTask}</p>
      <p class="backlog__text"><span>Deadline:</span> ${textTask}</p>
    </div>
  `;
}

export function createTaskList() {
  let html = Store.data.tasks.reduce((allTasks, task) => {
    return allTasks += createTask(task.id, task.subject, task.planEndDate);
  }, '');

  return `
    <p class="backlog__title">Backlog</p>
    <div class="backlog__wrapper">
      ${html}
    </div>
  `;
}
