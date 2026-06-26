<script setup>
import {ref, inject, computed} from 'vue';
import {useRoute} from 'vue-router';
import { Icon } from '@iconify/vue';

// Define props
const props = defineProps({
  icon: String,
  name: String,
  submenuItems: Array
});

const isCollapsed = inject('isCollapsed');
const isSubmenuOpen = inject(props.name);
const toggleSubmenu = inject('toggleSubmenu');
const route = useRoute();

// Comprueba si la ruta actual es la misma que la ruta del enlace en el submenu
const isActiveRoute = computed(() => {
  return props.submenuItems.some(item => item.to === route.path);
});
</script>

<template>
    <div class="w-full">
        <div class="w-full cursor-pointer" @click="toggleSubmenu(name)">
            <div
                :class="[
                'mx-3 my-1 flex items-center gap-x-2 px-3 py-3 hover:bg-primary-100 dark:hover:bg-primary-400/70 transition duration-300 ease-in-out rounded-lg',
                isCollapsed ? 'justify-center' : '',
                isActiveRoute ? 'bg-primary-500/80 dark:bg-primary-500' : ''
                ]"
            >
                <div class="flex items-center gap-x-2">
                    <Icon :icon="icon" :class="[ 'size-6 dark:text-white', isActiveRoute ? 'text-white' : '']"/>
                    <p v-if="!isCollapsed" :class="[ 'size-6 dark:text-white', isActiveRoute ? 'text-white' : '']">{{ $t(`pages.${name}`) }}</p>
                </div>
                <Icon v-if="!isCollapsed" :icon="isSubmenuOpen ? 'ph:caret-up' : 'ph:caret-down'"
                    :class="[ 'size-5 dark:text-white ml-auto', isActiveRoute ? 'text-white' : '']"/>
            </div>
        </div>
        <!-- Submenu -->
        <div v-if="isSubmenuOpen" class="pl-5 w-full">
            <RouterLink v-for="item in submenuItems" :key="item.to" :to="item.to" class="w-full">
                <div
                    class="mx-3 mt-2 flex items-center gap-x-2 px-3 py-3 hover:bg-primary-100 dark:hover:bg-primary-400/70 transition duration-300 ease-in-out rounded-lg cursor-pointer"
                    :class="{ 'bg-primary-200 dark:bg-primary-400': item.to === route.path }"
                >
                    <Icon :icon="item.icon" class="size-5 dark:text-white"/>
                    <p class="dark:text-white">{{ $t(`pages.${item.name}`) }}</p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>