import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AboutPage from '../components/AboutPage.vue';
import CompanyList from '@/components/CompanyList.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/companylist', component: CompanyList}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
