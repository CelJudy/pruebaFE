<script setup>
import {ref} from "vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import Logo from '@/components/Logo.vue'
import BaseAlert from '@/components/BaseAlert.vue'
import {login} from "@/utils/index.js";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const alertRef=ref(false);

let values=ref({
    email:'',
    password:''
});

const onSubmit = async () => {
    // handle form submission
    const response = await login("login", values.value);
    if(response.status === 200){
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("access-token", response.data.token.split("|")[1]);
        router.push("/");
    } else {
        if(response.status === 401){
            alertRef.value.showAlert(t('login.invalidCredentials'), t('login.invalidCredentials'),'error');
        }
    }
};
</script>

<template>
    <div class="bg-white dark:bg-gray-900 p-5">
        <div class="flex flex-col sm:flex-row items-center justify-between">
            <Logo class="mb-4 sm:mb-0 sm:mr-4" />
            <div class="flex items-center gap-x-5">
                <ThemeToggle />
                <LanguageSelector />
            </div>
        </div>
        <div class="flex justify-center min-h-screen">
            <div class="bg-white w-full md:w-8/12 lg:w-4/12 dark:bg-gray-900 mt-24">
                <h1 class="title-text text-center">{{ $t('login.title') }}</h1>
                <p class="subtitle-text text-center">{{ $t('login.subtitle') }}</p>

                <form @submit.prevent="onSubmit" class="mt-10">
                    <BaseInput
                        v-model="values.email"
                        :error="$t('validation.usernameError')"
                        type="text"
                        size="md"
                        :label="$t('validation.username')"
                        :placeholder="$t('validation.usernamePlaceholder')"
                        :required="true"
                    />
                    <BaseInput
                        v-model="values.password"
                        :error="$t('validation.passwordError')"
                        type="password"
                        size="md"
                        :label="$t('validation.password')"
                        :placeholder="$t('validation.passwordPlaceholder')"
                        :required="true"
                    />

                    <BaseButton
                        class="mt-5 w-full"
                        color="primary"
                        size="md"
                    >{{ $t('login.submit') }}</BaseButton>
                </form>
            </div>
        </div>
    </div>
    <BaseAlert ref="alertRef" />
</template>