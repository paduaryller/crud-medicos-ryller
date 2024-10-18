// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue'; // Importa a página de login
import DoctorTable from '@/components/DoctorTable.vue'; // Importa a tela de médicos

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage, // Página de login
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: DoctorTable, // Tela do CRUD de médicos
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
