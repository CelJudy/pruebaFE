<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Default from '@/layouts/defaultLayout.vue';
import Menu from '@/layouts/menuLayout.vue';

const route = useRoute();
const currentLayout = computed(() =>
    route.meta.layout === 'menu' ? Menu : Default
);

//const pageTitle = computed(() => route.meta.title || ''); // Usa el composable personalizado

</script>
<template>
    <component :is="currentLayout"></component>
</template>