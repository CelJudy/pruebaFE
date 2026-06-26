<script setup>
defineProps({
  titles: {
    type: Array,
    required: true
  },
  contents: {
    type: Array,
    required: true
  },
  rounded: {
    type: String,
    default: 'md',
    validator: value => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  scrollable: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
    <div class="flex flex-col">
        <div
            class="border-gray-300 dark:border-gray-500 border"
            :class="[
            scrollable && 'overflow-x-auto',
            rounded === 'sm' && 'rounded-md',
            rounded === 'md' && 'rounded-lg',
            rounded === 'lg' && 'rounded-xl',
        ]"
        >
            <div class="inline-block min-w-full align-middle">
                <div :class="scrollable && 'overflow-hidden'">
                    <table class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-500">
                        <thead class="bg-gray-200 dark:bg-gray-900/50">
                            <tr>
                                <th v-for="(title, index) in titles" :key="index" class="px-4 py-2 border-b border-gray-300 dark:border-gray-500 text-left dark:text-gray-200">
                                    {{ title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-600/90 divide-y divide-gray-300 dark:divide-gray-500">
                            <tr v-for="(row, rowIndex) in contents" :key="rowIndex">
                                <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-4 py-2 border-gray-300 dark:border-gray-500 dark:text-gray-200">
                                    {{ cell }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>