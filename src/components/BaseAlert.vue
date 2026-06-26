<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount, defineExpose } from 'vue';
import { Icon } from '@iconify/vue';

const showToast = ref(false);
const alertTitle = ref('');
const alertContent = ref('');
const alertType = ref('');

const visible = ref(false);
const progress = ref(100);
let interval;

const close = () => {
    visible.value = false;
    clearInterval(interval);
};

const updateProgress = () => {
    interval = setInterval(() => {
        progress.value -= 2;
        if (progress.value <= 0) {
            clearInterval(interval);
            close();
        }
    }, 100);
};

const reset = () => {
    clearInterval(interval);
    progress.value = 100;
    visible.value = true;
    updateProgress();
};

onMounted(() => {
    updateProgress();
});

onBeforeUnmount(() => {
    clearInterval(interval);
});

watch(() => visible.value, (newVal) => {
    if (!newVal) clearInterval(interval);
});

const getNotificationConfig = computed(() => {
    switch (alertType.value) {
        case 'info':
        return {
            container: 'bg-blue-100',
            icon: 'text-blue-600',
            title: 'text-blue-800',
            button: 'text-blue-600 hover:text-blue-700',
            progress: 'bg-blue-600',
            iconName: 'material-symbols:info-rounded'
        };
        case 'warning':
        return {
            container: 'bg-yellow-100',
            icon: 'text-yellow-600',
            title: 'text-yellow-800',
            button: 'text-yellow-600 hover:text-yellow-700',
            progress: 'bg-yellow-600',
            iconName: 'material-symbols:warning-rounded'
        };
        case 'error':
        return {
            container: 'bg-red-100',
            icon: 'text-red-700',
            title: 'text-red-800',
            button: 'text-red-700 hover:text-red-800',
            progress: 'bg-red-700',
            iconName: 'material-symbols:error-rounded'
        };
        case 'success':
        return {
            container: 'bg-green-200',
            icon: 'text-green-700',
            title: 'text-green-800',
            button: 'text-green-700 hover:text-green-800',
            progress: 'bg-green-700',
            iconName: 'material-symbols:check-circle-rounded'
        };
        default:
        return {
            container: 'bg-blue-100',
            icon: 'text-blue-600',
            title: 'text-blue-800',
            button: 'text-blue-600 hover:text-blue-700',
            progress: 'bg-blue-600',
            iconName: 'material-symbols:info-rounded'
        };
    }
});

const showAlert = (title, content, type) => {
    alertTitle.value = title;
    alertContent.value = content;
    alertType.value = type;

    if (showToast.value) {
        showToast.value = false;
        setTimeout(() => {
            showToast.value = true;
            reset();
        }, 0);
    } else {
        showToast.value = true;
        reset();
    }
};

defineExpose({ showAlert });
</script>
<template>
    <transition name="alert">
        <div v-if="visible" class="fixed bottom-0 inset-x-0 mx-auto flex justify-items-center mb-4 md:w-[40%] flex-col rounded-lg space-x-3 z-50">
            <div :class="[getNotificationConfig.container, 'p-4 rounded-lg']">
                <div class="flex items-center space-x-3">
                    <div class="shrink-0">
                        <Icon :icon="getNotificationConfig.iconName" :class="[getNotificationConfig.icon, 'size-6']" />
                    </div>
                    <div class="flex-1 space-y-1">
                        <p :class="[getNotificationConfig.title, 'text-md font-medium']">{{ alertTitle }}</p>
                        <p class="text-sm text-gray-700">{{ alertContent }}</p>
                    </div>
                    <div class="shrink-0">
                        <button
                            :class="[getNotificationConfig.button, 'p-1 rounded-xl -m-1 transition duration-300 ease-in-out']"
                            @click="close"
                        >
                            <Icon icon="material-symbols:close-rounded" class="size-6" />
                        </button>
                    </div>
                </div>
                <div class="relative w-full h-1 mt-3 rounded-full">
                    <div
                        :class="[getNotificationConfig.progress, 'absolute h-full rounded-full transition-width duration-300']"
                        :style="{ width: progress + '%' }"
                    ></div>
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped>
.alert-enter-from, .alert-leave-to{
    opacity: 0;
    transform: scale(0.5) translateY(100%);
}
.alert-enter-active, .alert-leave-active{
    transition: transform 0.5s, opacity 0.5s;
}
</style>
