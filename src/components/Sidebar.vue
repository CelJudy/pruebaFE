<script setup>
import { ref, provide } from 'vue';
import { Icon } from '@iconify/vue';
import SidebarItem from './SidebarItem.vue'
import SidebarSubmenuItem from './SidebarSubmenuItem.vue'
import Logo from './Logo.vue'


const isCollapsed = ref(false);
/* const isSubmenuOpen = ref({
    autentication:false,
    password:false
}); */
const autentication=ref(false);
const password=ref(false);

function toggleMenu() {
    isCollapsed.value = !isCollapsed.value;
    if (isCollapsed.value) {
        //isSubmenuOpen.value = false;
        autentication.value=false;
        password.value=false;
    }
}

function toggleSubmenu(submenu) {
    if (isCollapsed.value) {
        isCollapsed.value = false;
    }
    switch(submenu){
        case 'autentication':
            autentication.value=!autentication.value;
        break;
        case 'password':
            password.value=!password.value;
        break;
    }
    /* if(isSubmenuOpen.value[submenu]){
        console.log(submenu, "true");
        isSubmenuOpen.value[submenu]=false;
    }else{
        console.log(submenu, "false");
        isSubmenuOpen.value[submenu]=true;
    } */
    //isSubmenuOpen.value[submenu] = !isSubmenuOpen.value[submenu];
}

// Provide the state and functions
provide('isCollapsed', isCollapsed);
provide('autentication', autentication);
provide('password', password);
provide('toggleMenu', toggleMenu);
provide('toggleSubmenu', toggleSubmenu);
</script>

<template>
    <div class="flex min-h-screen items-start bg-primary-50 dark:bg-gray-900 relative">
        <div :class="['overflow-auto bg-white dark:bg-gray-700 h-screen border-gray-300 dark:border-gray-500 border-r-[1px] transition-all duration-300 ease-in-out z-10', isCollapsed ? 'w-20 sm:w-16 md:w-20 hidden lg:block' : 'w-64 sm:w-48 md:w-64 lg:block']">
            <div class="flex flex-col items-start">

                <div :class="['p-6', isCollapsed ? 'flex flex-col justify-center items-center w-full' : 'flex items-center justify-between w-full']">
                <Logo />
                </div>
                
                <SidebarItem
                    :to="'/'"
                    icon='ph:house'
                    name="home"/>
                <SidebarItem
                    :to="'/users'"
                    icon="material-symbols:book-ribbon-outline"
                    name="users"/>
            </div>
        </div>
        <button @click="toggleMenu" class="mt-3 lg:mt-4 p-2 bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-primary-100 transition duration-300 ease-in-out rounded-r-lg z-20">
            <Icon :icon="isCollapsed ? 'ph:arrow-right' : 'ph:arrow-left'" class="size-6 dark:text-white" />
        </button>
    </div>
</template>
