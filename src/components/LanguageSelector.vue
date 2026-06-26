<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const languages = [
    { code: 'en', name: 'English - US', flag: '/flags/united-states.png' },
    { code: 'es', name: 'Español - MX', flag: '/flags/mexico.png' }
];
const selectedLanguage = ref(locale.value);
const isDropdownOpen = ref(false);

const changeLanguage = (code) => {
    localStorage.setItem('selectedLanguage', code);
    locale.value = code;
    selectedLanguage.value = code; // Actualizar selectedLanguage
    isDropdownOpen.value = false; // Cerrar la lista desplegable después de seleccionar un idioma
};

const getFlag = (code) => {
    const lang = languages.find(lang => lang.code === code);
    return lang ? lang.flag : '';
};

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const getLanguageName = (code) => {
    const lang = languages.find(lang => lang.code === code);
    return lang ? lang.name : '';
};

onMounted(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
        selectedLanguage.value = savedLanguage;
        locale.value = savedLanguage;
    }
});
</script>

<template>
    <div class="cursor-pointer">
        <button @click="toggleDropdown" class="flex items-center border border-muted-300 dark:border-muted-800 dark:text-white bg-white dark:bg-gray-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out">
            <img :src="getFlag(selectedLanguage)" alt="Flag" class="mr-2 w-4 h-auto" />
            <span>{{ getLanguageName(selectedLanguage) }}</span>
        </button>
        <ul v-show="isDropdownOpen" class="absolute mt-2 w-full rounded-md border border-muted-300 dark:border-muted-800 dark:text-white bg-white dark:bg-gray-800 shadow-md transition duration-300 ease-in-out">
            <li v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)" class="flex items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer transition duration-300 ease-in-out">
                <img :src="lang.flag" alt="Flag" class="mr-2 w-4 h-auto" />
                <span>{{ lang.name }}</span>
            </li>
        </ul>
    </div>
</template>