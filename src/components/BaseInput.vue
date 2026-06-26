<script setup>
import { defineProps, ref, computed, watch } from 'vue';

const props =defineProps([
    'modelValue',
    'error',
    'disabled',
    'type',
    'size',
    'label',
    'placeholder',
    'id',
    'name',

    'required',
    'onlyNumbers',
    'readOnly',
]);

const emits = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);
const shouldShowError=ref(false);
const disabled=ref(computed(()=>{
    return (props.disabled)?true:false;
}));
const readOnly=ref(computed(()=>{
    return (props.readOnly)?true:false;
}));

const handleBlur = () => {
    if(props.required){
        if(internalValue.value.length==0){
            shouldShowError.value=true;
        }else{
            shouldShowError.value=false;
        }
    }
};

const handleKeyDown=(event)=>{
    if(props.onlyNumbers){
        if(!((event.keyCode>=48 && event.keyCode<=57) || event.keyCode==8 || (event.keyCode>=96 && event.keyCode<=105))){
            event.preventDefault()
        }
    }
}

watch(internalValue, (newValue) => {
    emits('update:modelValue', newValue);
});

const inputClass = computed(() => {
    let baseClass = 'bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600';
    let sizeClass = props.size === 'lg' ? 'text-lg' : 'text-sm';
    //let contrastClass = props.contrast === 'default' ? '' : 'contrast-class'; // Add more classes based on contrast if needed

    //return `${baseClass} ${sizeClass} ${contrastClass}`;
    return `${baseClass} ${sizeClass}`;
});


</script>
<template>
    <div class="mb-4">
        <label :for="id" class="block label-text mb-2">{{ props.label }}</label>
        <div class="relative">
            <input
                :type="props.type"
                :id="props.id"
                :name="props.name"
                v-model="internalValue"
                :placeholder="props.placeholder"
                :disabled="disabled"
                :readonly="readOnly"
                :class="['form-input w-full rounded-md px-4 py-2', inputClass]"
                @blur="handleBlur"
                @keydown="handleKeyDown"
            />
            <!-- <i v-if="icon" :class="['absolute left-3 top-2', iconClass]"></i> -->
        </div>
        <p v-if="shouldShowError" class="error-text mt-1">{{ error }}</p>
    </div>
</template>