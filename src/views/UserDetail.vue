<template>
  <div class="col-span-1 md:col-span-3 bg-card p-4  mx-10 mt-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">User Detail</h2>
      <div class="flex gap-4">
        <button @click="toggleEdit" class="bg-slate-900 text-slate-200 px-4 py-2 rounded-md hover:bg-slate-700">
          {{ isEditing ? `Cancel` : 'Edit' }} </button>
        <button @click="deleteUser" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400">
          Delete</button>
          <button @click="toggleEdit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 mr-5"
            v-if="isEditing">
            Save</button>
      </div>
    </div>
    <div class="flex-1 p-6 grid grid-cols-1 gap-6">
      <div class="mx-24 bg-card p-10 rounded-md shadow-2xl bg-white" v-if="user">
        <form @submit.prevent="saveUser">
          <div>
            <label for="address" class="block font-medium mb-1 mx">Name:</label>
            <input type="text" id="address" :readonly="!isEditing" v-model="user.name"
              class="bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
          </div>
          <div>
            <label for="address" class="block font-medium mb-1 ">Email:</label>
            <input type="text" id="address" :readonly="!isEditing" v-model="user.email"
              class="bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
          </div>

          <div>
            <label for="address" class="block font-medium mb-1">Phone:</label>
            <input type="text" id="address" :readonly="!isEditing" v-model="user.phone"
              class="bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
          </div>
          <div>
            <label for="address" class="block font-medium mb-1">Address</label>
            <input type="text" id="address" :readonly="!isEditing" v-model="user.address"
              class="bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
          </div>
          <div>
            <label for="address" class="block font-medium mb-1">Gender:</label>
            <select v-model="user.gender" :disabled="!isEditing"
              class="bg-muted text-muted-foreground px-4 py-2 rounded-md w-1/2">
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

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
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const user = ref<User | null>(null);
    const isEditing = ref(false);

    const loadUser = () => {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      user.value = users.find(u => u.id === route.params.id) || null;
    };

    const saveUser = () => {
      if (user.value) {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.id === user.value!.id);
        if (index !== -1) {
          users[index] = user.value!;
          localStorage.setItem('users', JSON.stringify(users));
          toast.success('User saved successfully!');
          router.push('/users');
        }
      }
    };

    const deleteUser = () => {
      if (user.value) {
        let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.id !== user.value!.id);
        localStorage.setItem('users', JSON.stringify(users));
        toast.success('User deleted successfully!');
        router.push('/users');
      }
    };

    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    loadUser();

    return {
      user,
      isEditing,
      saveUser,
      deleteUser,
      toggleEdit,
    };
  }
});
</script>