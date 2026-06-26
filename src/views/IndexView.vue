<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
import {getRows} from "@/utils/index.js";
import {ref} from "vue";
import { onBeforeMount  } from "vue";



const barData = ref([]);

const roles={
    1:{label:"admin", color: '#10b981'},
    2:{label:"user", color: '#3b82f6'}
}

const pieData = ref([]);

const maxBarValue = computed(() => Math.max(...barData.value.map((item) => item.value)))

const pieStyle = computed(() => {
  let cumulative = 0;
  const total = pieData.value.reduce((acumulador, item) => acumulador + item.value, 0);

  const segments = pieData.value.map((item) => {
    const start = cumulative;
    cumulative += ((item.value * 100) / total);
    const end = cumulative;
    return `${roles[item.role].color} ${start}% ${end}%`;
  })
  return `conic-gradient(${segments.join(', ')})`;
})

onBeforeMount (async () => {
    const barDatarows=await getRows("users/registered-by-month");
    barData.value.push(...barDatarows);

    const pieDatarows=await getRows("users/by-role");
    pieData.value.push(...pieDatarows);


})
</script>

<template>
  <div class="py-4 flex flex-wrap justify-center gap-4">
    <div class="rounded-2xl border border-slate-200 bg-white dark:bg-gray-600/90 p-6 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-800 dark:text-gray-200">{{ $t('dashboard.chartBar') }}</h2>
        </div>
      </div>

      <div class="flex h-64 items-end justify-between gap-3 rounded-xl bg-slate-50 p-4">
        <div
          v-for="item in barData"
          :key="item.label"
          class="flex flex-1 flex-col items-center gap-2"
        >
          <div class="flex h-44 w-full items-end justify-center">
            <div
              class="w-full max-w-10 rounded-t-xl bg-blue-500 transition-all duration-300"
              :style="{ height: `${(item.value / maxBarValue) * 100}%` }"
            ></div>
          </div>
          <span class="text-sm font-medium text-slate-600">{{ item.label }}</span>
          <span class="text-xs text-slate-400">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white dark:bg-gray-600/90 p-6 shadow-sm">
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-slate-800 dark:text-gray-200">{{ $t('dashboard.chartCacke') }}</h2>
      </div>

      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center justify-center">
          <div
            class="h-48 w-48 rounded-full"
            :style="{ background: pieStyle }"
          ></div>
        </div>

        <div class="flex-1 space-y-3">
          <div
            v-for="item in pieData"
            :key="item.role"
            class="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
          >
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: roles[item.role].color }"></span>
              <span class="text-sm text-slate-600">{{ roles[item.role].label }}</span>
            </div>
            <span class="text-sm font-semibold text-slate-700">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>