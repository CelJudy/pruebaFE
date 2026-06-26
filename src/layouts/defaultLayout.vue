<script setup>
import { RouterView } from 'vue-router'

//const pageTitle = computed(() => route.meta.title || ''); // Usa el composable personalizado

</script>
<template>
    <div class="flex min-h-screen w-full items-start bg-primary-50 dark:bg-gray-900 transition duration-300 ease-in-out relative">
        <div class="flex-auto p-4">
            <div>
                <RouterView />
            </div>
        </div>
    </div>
</template>