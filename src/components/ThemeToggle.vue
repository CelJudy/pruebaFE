<script setup>
import {ref} from "vue";
import { Icon } from '@iconify/vue';
const colorModeDark = ref(localStorage.getItem('theme', 'light')=='light'?false:true)
const changeColor = () => {
    //colorModeDark.value=(colorModeDark.value)?false:true;
    if(colorModeDark.value){
        colorModeDark.value=false
        console.log(document.documentElement.classList);
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }else{
        colorModeDark.value=true
        console.log(document.documentElement.classList);
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

</script>

<template>
    <div class="cursor-pointer">
        <button aria-label="Color Mode" class="rounded-3xl inline-block text-base p-2 leading-none border border-muted-300 dark:border-muted-800 text-white bg-white dark:bg-gray-800 mt-0 transition duration-300 ease-in-out"
                @click="changeColor">
            <Icon v-if="colorModeDark" icon="ri:moon-clear-fill" class="text-xl size-5" />
            <Icon v-else icon="heroicons:sun-16-solid" class="text-xl text-warning size-5" color="orange" />
        </button>
    </div>
</template>