<template>
  <div class=" bg-slate-100 min-h-screen ">
    <Menu />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/components/Menu.vue';

export default defineComponent({
  components: {
    Menu,
  },
});
</script>

<style>
/* Global styles if any */
</style>
