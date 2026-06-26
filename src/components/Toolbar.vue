<script setup>
//import { usePageTitle } from '~/composables/usePageTitle'; // Importa el composable personalizado
import { useRouter } from 'vue-router'
const router = useRouter();

import LanguageSelector from "./LanguageSelector.vue";
import ThemeToggle from "./ThemeToggle.vue"; // Asegúrate de tener este componente importado

//const pageTitle = computed(() => route.meta.title || ''); // Usa el composable personalizado
const pageTitle ="home"
</script>

<template>
  <div class="flex sm:flex-row items-center justify-between gap-4 sm:gap-0">
    <p class="title-text text-center sm:text-left">{{ $t(`pages.${router.currentRoute.value.name}`) }}</p>
    <div class="flex flex-wrap items-center justify-center sm:justify-end gap-3">
      <ThemeToggle/>
      <LanguageSelector/>
    </div>
  </div>
</template>
