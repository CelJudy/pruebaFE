<script setup>
import { inject, computed  } from 'vue'
import {useRoute} from 'vue-router';
import { Icon } from '@iconify/vue';

const isCollapsed = inject('isCollapsed');
const route = useRoute();

// Define props
const props = defineProps({
    to: String,
    icon: String,
    name: String
});

// Comprueba si la ruta actual es la misma que la ruta del enlace
const isActiveRoute = computed(() => {
    return route.path === props.to;
});
</script>
<template>
    <RouterLink :to="to" class="w-full">
        <div
            :class="[
            'mx-3 my-1 flex items-center gap-x-2 px-3 py-3 hover:bg-primary-200 dark:hover:bg-primary-400/70 transition duration-300 ease-in-out rounded-lg cursor-pointer',
            isCollapsed ? 'justify-center' : '',
            isActiveRoute ? 'bg-primary-500/80 dark:bg-primary-500' : ''
        ]"
        >
        <Icon :icon="icon" :class="[ 'size-6 dark:text-white', isActiveRoute ? 'text-white' : '']"/>
        <p v-if="!isCollapsed" :class="[ 'size-6 dark:text-white', isActiveRoute ? 'text-white' : '']">{{ $t(`pages.${name}`) }}</p>
        </div>
    </RouterLink>
</template>
