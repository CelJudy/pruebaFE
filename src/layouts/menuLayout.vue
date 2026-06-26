<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue';
import Toolbar from '@/components/Toolbar.vue';

//const pageTitle = computed(() => route.meta.title || ''); // Usa el composable personalizado

</script>

<template>
    <!-- <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
        </div>
    </header>

    <RouterView /> -->
    <div class="flex min-h-screen w-full items-start bg-primary-50 dark:bg-gray-900 transition duration-300 ease-in-out">
        <div class="sticky top-0 h-screen flex-initial">
            <Sidebar class="flex-shrink-0" />
        </div>
        <div class="overflow-x-auto flex-auto p-4">
            <Toolbar class="flex-shrink-0" />
            <div class="flex-grow">
                <RouterView />
            </div>
        </div>
    </div>
</template>
