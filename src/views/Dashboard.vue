<template>
  <div class="col-span-1 md:col-span-3 bg-card p-4 mx-10 mt-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">Dashboard</h2>
    </div>
    <div class="flex-1 mx-20 bg-card p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-card p-4 rounded-md shadow-md bg-white">
        <h2 class="text-xl font-bold mb-2">Total Users</h2>
        <p class="text-4xl font-bold">{{ userCount }}</p>
      </div>
      <div class="bg-card p-4 rounded-md shadow-md bg-white">
        <h2 class="text-xl font-bold mb-2">Users by Gender</h2>
        <div class="grid grid-cols-3 gap-2 justify-center">
          <div class="text-slate-50 bg-slate-800 p-2 rounded-md text-center">
            <p class="text-2xl font-bold">{{ maleCount }}</p>
            <p class="text-sm">Male</p>
          </div>
          <div class="text-slate-50 bg-slate-800 p-2 rounded-md text-center">
            <p class="text-2xl font-bold">{{ femaleCount }}</p>
            <p class="text-sm">Female</p>
          </div>
          <div class="text-slate-50 bg-slate-800 p-2 rounded-md text-center">
            <p class="text-2xl font-bold">{{ otherCount }}</p>
            <p class="text-sm">Other</p>
          </div>
        </div>
      </div>
      <div class="bg-card p-4 rounded-md shadow-md bg-white">
        <h2 class="text-xl font-bold mb-2">Users Created Today</h2>
        <p class="text-4xl font-bold">{{ todayCount }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

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
    const userCount = ref(0);
    const maleCount = ref(0);
    const femaleCount = ref(0);
    const otherCount = ref(0);
    const todayCount = ref(0);

    const loadUserStats = () => {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      userCount.value = users.length;

      let males = 0;
      let females = 0;
      let others = 0;
      let today = 0;

      const todayDate = new Date().toISOString().split('T')[0];

      users.forEach(user => {
        if (user.gender === 'male') males++;
        else if (user.gender === 'female') females++;
        else others++;

        if (user.timestamp.split('T')[0] === todayDate) {
          today++;
        }
      });

      maleCount.value = males;
      femaleCount.value = females;
      otherCount.value = others;
      todayCount.value = today;
    };

    onMounted(loadUserStats);

    return {
      userCount,
      maleCount,
      femaleCount,
      otherCount,
      todayCount,
    };
  }
});
</script>