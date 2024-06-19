<template>
  <header class="text-slate-50 bg-slate-800 py-4 px-10">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-lg font-bold">
        <router-link to="/">My Users</router-link>
      </div>
      <nav>
        <ul class="flex space-x-4 gap-7">
          <li :class="{ 'bg-gray-600': isRouteActive('/') }">
            <router-link to="/" :class="{ 'bg-gray-600': isRouteActive('/') }">Dashboard</router-link>
          </li>
          <li :class="{ 'bg-gray-600': isRouteActive('/users') }" >
            <router-link to =" /users" :class="{ 'bg-gray-600': isRouteActive('/users') }">User List</router-link>
          </li>
          <li :class="
            { 'bg-gray-600': isRouteActive('/users/:id') }">
              <router-link to =" /add-user" :class="{ 'bg-gray-600': isRouteActive('/') }">Add User</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();

    const isRouteActive = (routePath: string): boolean => {
      return route.path === routePath;
    };

    return {
      isRouteActive,
    };
  },
});

</script>

<style scoped>
/* Add any specific styles for the menu if needed */
</style>
