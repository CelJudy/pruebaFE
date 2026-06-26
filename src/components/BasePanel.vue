<script setup>
import { ref, defineExpose } from 'vue';
import { Icon } from '@iconify/vue';

const isPanelOpen=ref(false);

const closePanel = () => {
    isPanelOpen.value= false;
};

const openPanel = () => {
    isPanelOpen.value= true;
}

defineExpose({
    openPanel,
});

</script>
<template>
    <transition name="opacy">
        <div v-show="isPanelOpen" class="bg-black bg-opacity-50 fixed inset-0 z-50 flex justify-end">
            <transition name="panel">
                <div v-if="isPanelOpen" class="w-[70%] md:w-[60%] lg:w-[40%] xl:w-[20%] bg-white dark:bg-gray-700 rounded-l-xl shadow-md h-full transition-transform transform" :class="{ 'translate-x-0': isPanelOpen, 'translate-x-full': !isPanelOpen }">
                    <div class="relative p-3">
                    <slot></slot>
                    <button @click="closePanel()" class="absolute top-3 right-3 text-red-500 hover:text-red-700 dark:text-red-500/90 dark:hover:text-red-700 transition duration-300 ease-in-out">
                        <Icon icon="heroicons-solid:x" class="h-6 w-6"/>
                    </button>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<style scoped>
.opacy-enter-active, .opacy-leave-active {
    transition: opacity 0.5s;
}
.opacy-enter-from, .opacy-leave-to {
    opacity: 0;
}

.panel-leave-active, .panel-enter-active{
  transition: transform 0.5s ease-in-out;
}
.panel-leave-to, .panel-enter-from{
  transform: translateX(100%);
}


</style>
