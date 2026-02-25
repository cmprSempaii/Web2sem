import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {dark: true,
    theme: {
      token: {
        colorPrimary: '#1890ff',
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Главная страница',
      path: '/home',
      component: './Home',
    },
    {
      name: 'О разработчике',
      path: '/about',
      component: './About',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      path: '/feedback',
      component : './Feedback'
    },
  ],
  npmClient: 'npm',
});

