import { Scheduler } from '@/components/scheduler/Scheduler';
import { Table } from '@/components/table/Table';
import { Backlog } from '@/components/backlog/Backlog';
import { Store } from '@/store/Store';
import './scss/main.scss';

const store = new Store();

const app = async () => {
  await store.getStore();
}

app().then(response => {
  const scheduler = new Scheduler('#app', {
    components: [
      Table,
      Backlog
    ]
  });
  
  scheduler.render();
})






