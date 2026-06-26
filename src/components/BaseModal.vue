<script setup>
import { ref, watchEffect, defineExpose } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps(['size', 'header']);

const isModalOpen=ref(false);

const closeModal = () => {
    isModalOpen.value= false;
};

const openModal = () => {
    isModalOpen.value= true;
}

const modalClasses = ref('');

watchEffect(() => {
    switch (props.size) {
        case 'sm':
        modalClasses.value = 'lg:w-[50%] xl:w-[25%]';
        break;
        case 'md':
        modalClasses.value = 'lg:w-[70%] xl:w-[40%]';
        break;
        case 'lg':
        modalClasses.value = 'lg:w-[80%] xl:w-[60%]';
        break;
        case 'xl':
        modalClasses.value = 'lg:w-[90%] xl:w-[80%]';
        break;
        default:
        modalClasses.value = 'lg:w-[70%] lg:h-[70%] xl:w-[60%] xl:h-[60%]';
        break;
    }
});

defineExpose({
    openModal,
    closeModal
});
</script>

<template>
    <transition name="opacy">
        <div v-show="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <transition name="modal">
                <div v-if="isModalOpen" :class="modalClasses" class="w-64 sm:w-80 md:w-96 bg-white dark:bg-gray-700 dark:text-white p-5 rounded-lg shadow-lg flex flex-col">
                    <div class="modal-header flex-shrink-0 flex justify-between items-center">
                        <h2 class="text-xl font-bold dark:text-gray-200">{{props.header}}</h2>
                        <div class="flex justify-end">
                            <button @click="closeModal" class="h-6 w-6 text-red-500 hover:text-red-700 dark:text-red-500/90 dark:hover:text-red-700 transition duration-300 ease-in-out">
                                <Icon icon="heroicons-solid:x" class="h-6 w-6"/>
                            </button>
                        </div>
                    </div>
                    <div v-if="$slots.content" class="modal-content flex-grow pb-2">
                        <slot name="content"></slot>
                    </div>
                    <div v-if="$slots.footer" class="modal-footer flex justify-between ">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<style scoped>
.opacy-enter-active, .opacy-leave-active {
    transition: opacity 0.8s;
}
.opacy-enter-from, .opacy-leave-to {
    opacity: 0;
}

.modal-enter-from, .modal-leave-to {
    transform: scale(0.5);
}
.modal-enter-active, .modal-leave-active {
    transition: transform 0.8s;
}

</style>