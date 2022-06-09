import { Store } from '@/store/Store';
import { formatDate } from '@core/utils';

function createRow(user, dates) {
  const rowHtml = dates.reduce((allCell, date) => {
    return allCell += createCell(user, date);
  }, '');

  return `
    <div class="row">
      <div class="row__info" id="${user.id}">${user.firstName}<br>${user.surname}</div>
      <div class="row__data">${rowHtml}</div>
    </div>
  `;
}

function createCell(user, date) {
  let cellHtml = '';

  if (user.tasks) {
    user.tasks.forEach(task => {
      if (task.startDate === date) {
        cellHtml += createTask(task);
      }
    })
  }

  return `
    <div class="cell" id="${user.id}-${date}">
      ${cellHtml}
    </div>
  `;
}

function createTask(task) {
  const taskStatus = task.timestamp > Store.data.now ? 'task_done' : 'task_expired';

  return `
    <div class="task ${taskStatus}" data-info="Deadline - ${task.endDate}">
      <p>${task.subject}</p>
    </div>
  `;
}

function createInsertedTask(task) {
  const taskStatus = + new Date(task.planEndDate) > Store.data.now ? 'task_done' : 'task_expired';
  let $div = document.createElement('div');
  $div.classList.add('task', taskStatus);
  $div.setAttribute('data-info', `Deadline - ${formatDate(task.planEndDate)}`);
  $div.innerHTML = `<p>${task.subject}</p>`;

  return $div;
}

function createDateCell(date) {
  return `<div class="col">${date}</div>`;
}

function createTable() {
  const { dates, users } = Store.data;

  const datesHtml = dates.reduce((allDates, date) => {
    return allDates += createDateCell(date);
  }, '');

  const usersHtml = users.reduce((allUsers, user) => {
    return allUsers += createRow(user, dates);
  }, '');

  return `
    <div class="table__nav">
      <button class="btn" id="left">Left</button>
      <button class="btn" id="right">Right</button>
    </div>
    <div class="row">
      <div class="row__info row__info_empty"></div>
      <div class="row__data">
        ${datesHtml}
      </div>
    </div>
    ${usersHtml}
  `;
}

export { createTable, createInsertedTask};