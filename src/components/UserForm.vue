<template>
    <div class="col-span-1 md:col-span-3 bg-card p-4 mx-10 mt-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold">Add User</h2>
      </div>
      <div class="flex-1 p-6 grid grid-cols-1 gap-6 ">
        <div class="mx-24 bg-card p-10 rounded-md shadow-2xl bg-white">
          <form @submit.prevent="addUser">
            <div class="mb-5">
              <label for="address" class="block font-medium mb-1 w">Name:</label>
              <input type="text" v-model="user.name" required
                class="border bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
            </div>
            <div class="mb-5">
              <label for="address" class="block font-medium mb-1 w-">Email:</label>
              <input type="email" v-model="user.email" required
                class="border bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
            </div>
  
            <div class="mb-5">
              <label for="address" class="block font-medium mb-1">Phone:</label>
              <input type="tel" v-model="user.phone" required
                class="border bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
            </div>
            <div class="mb-5">
              <label for="address" class="block font-medium mb-1">Address</label>
              <input type="text" v-model="user.address" required
                class="border bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
            </div>
            <div class="mb-5">
              <label for="address" class="block font-medium mb-1">Gender:</label>
              <select v-model="user.gender" required
                class="border bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <button type="submit" class="bg-slate-900 text-slate-200 px-4 py-2 rounded-md hover:bg-slate-700 mt-5"
              >
              Add User</button>
          </form>
        </div>
      </div>
    </div>
  </template>



<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';

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
    const toast = useToast();
    const router = useRouter();
    const user = ref<User>({
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      timestamp: '',
    });

    const addUser = () => {
      user.value.id = uuidv4();
      user.value.timestamp = new Date().toISOString();
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(user.value);
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('User added successfully!');
      user.value = { id: '', name: '', email: '', phone: '', address: '', gender: '', timestamp: '' };
      router.push('/users');
    };

    return {
      user,
      addUser,
    };
  }
});
</script>