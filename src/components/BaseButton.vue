<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'success', 'warning', 'info', 'error', 'muted'].includes(value)
    },
    icon: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['click']);

const buttonClass = computed(() => {
    const baseClass = 'text-white';
    const colorClasses = {
        primary: 'bg-primary-500 hover:bg-primary-700',
        secondary: 'bg-secondary-500 hover:bg-secondary-700',
        success: 'bg-green-500 hover:bg-green-700',
        warning: 'bg-yellow-500 hover:bg-yellow-700',
        info: 'bg-blue-500 hover:bg-blue-700',
        error: 'bg-red-500 hover:bg-red-700',
        muted: 'bg-gray-500 hover:bg-gray-700'
    };
    return `${baseClass} ${colorClasses[props.color]}`;
});

const sizeClass = computed(() => {
    const sizeClasses = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };
    return sizeClasses[props.size];
});

const onClick = () => {
    emits('click');
};
</script>
<template>
    <button
        :class="[
        'flex items-center justify-center rounded-md focus:outline-none transition duration-300 ease-in-out',
        buttonClass,
        sizeClass
        ]"
        @click="onClick"
        :disabled="disabled"
        type="submit"
    >
        <i v-if="icon" :class="['mr-2', icon]"></i>
        <slot></slot>
    </button>
</template>