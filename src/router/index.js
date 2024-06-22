import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import EmployeeSignIn from '@/views/EmployeeSignIn.vue';
import EmployeeSignOut from '@/views/EmployeeSignOut.vue';
import EmployeeSignInConfirm from '@/views/EmployeeSignInConfirm.vue';
import GuestPage from '@/views/GuestPage.vue';
import GuestSignIn from '@/views/GuestSignIn.vue';
import GuestSignOut from '@/views/GuestSignOut.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/employee-signin',
    name: 'EmployeeSignIn',
    component: EmployeeSignIn
  },
  {
    path: '/employee-signout',
    name: 'EmployeeSignOut',
    component: EmployeeSignOut
  },
  {
    path: '/employee-signin-confirm',
    name: 'EmployeeSignInConfirm',
    component: EmployeeSignInConfirm
  },
  {
    path: '/guest',
    name: 'GuestPage',
    component: GuestPage
  },
  {
    path: '/guest-signin',
    name: 'GuestSignIn',
    component: GuestSignIn
  },
  {
    path: '/guest-signout',
    name: 'GuestSignOut',
    component: GuestSignOut
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
