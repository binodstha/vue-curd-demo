<template>
  <div class="col-span-1 md:col-span-3 bg-card p-4  mx-10 mt-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">User List</h2>
      <button @click="toggleShowAll" class="bg-slate-900 text-slate-200 px-4 py-2 rounded-md hover:bg-slate-700">
        {{ showAll ? 'Show Less' : 'Show All Users' }}
      </button>
    </div>
    <div class="mx-24 bg-card p-10 rounded-md shadow-2xl bg-white">
      <table class="table-auto w-full mb-10 border-b-2">
        <thead>
          <tr class=" border-b-2">
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Phone</th>
            <th class="px-4 py-2">Address</th>
            <th class="px-4 py-2">Gender</th>
            <th class="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in displayedUsers" :key="user.id" class=" border-b-2 border-slate-100">
            <td class=" px-4 py-2 hover:underline decoration-slate-400">
              <router-link :to="{ name: 'UserDetail', params: { id: user.id } }">{{ user.name }}</router-link>
            </td>
            <td class=" px-4 py-2">{{ user.email }}</td>
            <td class=" px-4 py-2">{{ user.phone }}</td>
            <td class=" px-4 py-2">{{ user.address }}</td>
            <td class=" px-4 py-2">{{ user.gender }}</td>
            <td class=" px-4 py-2">{{ new Date(user.timestamp).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  timestamp: string;
}

export default defineComponent({
  setup() {
    const users = ref<User[]>([]);
    const showAll = ref(false);

    const displayedUsers = computed(() => {
      const sortedUsers = [...users.value].sort((a, b) => a.name.localeCompare(b.name));
      return showAll.value ? sortedUsers : sortedUsers.slice(0, 3);
    });

    const toggleShowAll = () => {
      showAll.value = !showAll.value;
    };

    const loadUsers = () => {
      users.value = JSON.parse(localStorage.getItem('users') || '[]');
    };

    onMounted(loadUsers);

    return {
      displayedUsers,
      showAll,
      toggleShowAll,
    };
  }
});
</script>