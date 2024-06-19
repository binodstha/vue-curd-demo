import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import UserList from '../views/UserList.vue';
import UserDetail from '../views/UserDetail.vue';
import UserForm from '../components/UserForm.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard,  meta: { title: 'Dashboard' },  },
  { path: '/users', name: 'UserList', component: UserList,  meta: { title: 'User List' },  },
  { path: '/users/:id', name: 'UserDetail', component: UserDetail, props: true,  meta: { title: 'User Details' },  },
  { path: '/add-user', name: 'UserForm', component: UserForm,  meta: { title: 'Add Users' },  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Update page title based on meta information
  document.title = `${to.meta.title} | Your App Name`; // Change 'Your App Name' to your actual app name
  next();
});

export default router;
