import { createRouter, createWebHistory } from 'vue-router'
import historyVue from '../pages/history.vue';
import newSoliVue from '../pages/newSoli.vue'

const routes :  any = [
  {
    path: '/soli',
    name: 'Soli',
    component: newSoliVue
  },
  {
   path: '/historic',
   name: 'Histo',
   component: historyVue
  }
]
const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router