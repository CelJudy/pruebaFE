<script setup>
import {ref, watch} from "vue";
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from "./BaseModal.vue";
import BaseAlert from '@/components/BaseAlert.vue'
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    tableContents: {
        type: Array,
        required: true
    },
    columns:{
        type: Array,
        required: true
    },
    inputs: {
        type: Array,
        required: true
    },
    deleteRow: {
        type: Function,
        required: true
    },
    addRow: {
        type: Function,
        required: true
    },
    updateRow: {
        type: Function,
        required: true
    },
});


const rowsByPage=ref(10);
const setRowsByPage=(event)=>{
    if(event.keyCode==13){
        setPageContent(1);
    }
}
const allTableContents=ref(props.tableContents);
const pageTableContent=ref([]);
const numPages=ref(Math.ceil(props.tableContents.length/rowsByPage.value));
const currentPage=ref(1);

// Watch para detectar cambios en tableContents desde el padre
watch(() => props.tableContents, (newValue) => {
    allTableContents.value = newValue;
    setPageContent(1);
}, { deep: true });

const setPageContent=(numPage)=>{
    currentPage.value=numPage;
    let pageTableCont=[];
    for(let i=((rowsByPage.value*numPage)-(rowsByPage.value-1));i<=(rowsByPage.value*numPage);i++){
        if(allTableContents.value[i-1]!==undefined){
            pageTableCont.push(allTableContents.value[i-1]);
        }
    }
    pageTableContent.value=pageTableCont;
    numPages.value=Math.ceil(allTableContents.value.length/rowsByPage.value);
}
setPageContent(1);


const deleteModalRef=ref(false);
const formModalRef=ref(false);
const alertRef=ref(false);
let selectedID=0;
let selectedRowIndex=0;
let goToPageInput=1;
let saveForm=true;

const goToPage=(event)=>{
    if(event.keyCode==13){
        setPageContent(parseInt(goToPageInput));

    }
}

let addRow=true;
const searchRow=(event)=>{
    if(event.keyCode==13 || event.keyCode===undefined){
        let allContent=[];
        props.tableContents.forEach(currentRow => {
            addRow=true;
            props.columns.forEach(filter => {
                if(filter.name=="id"){
                    if(filter.filtervalue!=currentRow[filter.name] && filter.filtervalue!=""){
                        console.log("filtro1");
                        addRow=false;
                    }
                }else{
                    if(filter.type=="select"){
                        if(filter.filtervalue!=currentRow[filter.name] && filter.filtervalue!=""){
                            console.log("filtro2", filter.filtervalue, currentRow[filter.name]);
                            addRow=false;
                        }
                    }else if(!currentRow[filter.name].includes(filter.filtervalue) && filter.filtervalue!=""){
                        console.log("filtro3");
                        addRow=false;
                    }
                }
            });
            if(addRow){
                allContent.push(currentRow);
            }
        });
        allTableContents.value=allContent;
        setPageContent(1);
    }
}

const clearFilters=()=>{
    allTableContents.value=props.tableContents;
    setPageContent(1);
    props.columns.forEach(element => {
        element.filtervalue="";
    });
}

const openDeleteModal=(id, index)=>{
    selectedID=id;
    selectedRowIndex=index;
    deleteModalRef.value.openModal();
}

const confirmDelete=async ()=>{
    if(await props.deleteRow(selectedID, selectedRowIndex)){
        alertRef.value.showAlert(t('crud.alertTitleSuccess'), t('crud.alertContentDelete'),'success');
        allTableContents.value=props.tableContents;
        setPageContent(1);
    }else{
        alertRef.value.showAlert(t('crud.alertTitleError'), t('crud.alertContentErrorDelete'),'error');
    }
    deleteModalRef.value.closeModal();
}

const openFormModal=(row, index)=>{
    if(row!==null){
        saveForm=false;
        props.columns.forEach(element => {
            if(element.name=="id"){
                selectedID=row.id;
                selectedRowIndex=index;
            }else{
                const input=props.inputs.find((({name})=>name==element.name));
                props.inputs[props.inputs.findIndex((({name})=>name==element.name))].value=(row[input.name].id===undefined)?row[input.name]:row[input.name].id;
            }
        });
    }else{
        saveForm=true;
        props.inputs.forEach(element => {
            element.value="";
        });
    }
    formModalRef.value.openModal();
}



const confirmForm=async ()=>{
    if(saveForm){
        if(await props.addRow()){
            alertRef.value.showAlert(t('crud.alertTitleSuccess'), t('crud.alertContentAdd'),'success');
            allTableContents.value=props.tableContents;
            setPageContent(1);
        }else{
            alertRef.value.showAlert(t('crud.alertTitleError'), t('crud.alertContentErrorAdd'),'error');
        }
    }else{
        if(await props.updateRow(selectedID, selectedRowIndex)){
            alertRef.value.showAlert(t('crud.alertTitleSuccess'), t('crud.alertContentUpdate'),'success');
            allTableContents.value=props.tableContents;
            setPageContent(1);
        }else{
            alertRef.value.showAlert(t('crud.alertTitleError'), t('crud.alertContentErrorUpdate'),'error');
        }
    }
    formModalRef.value.closeModal();
}


</script>
<template>
    <div class="flex flex-col">
        <div class="flex flex-wrap items-center justify-end gap-3 p-2">
            <BaseButton @click="openFormModal(null, null)"><Icon icon="material-symbols:forms-add-on" class="size-6"></Icon></BaseButton>
        </div>
        <div class="border-gray-300 dark:border-gray-500 border overflow-x-auto rounded-md">
            <div class="inline-block min-w-full align-middle">
                <table class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-500">
                    <thead class="bg-gray-200 dark:bg-gray-900/50">
                        <tr>
                            <th v-for="(element, index) in columns" :key="index" class="px-4 py-2 border-b border-gray-300 dark:border-gray-500 text-left dark:text-gray-200">
                                {{ $t(`crud.${element.name}`) }}
                            </th>
                            <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-500 text-left dark:text-gray-200"></th>
                        </tr>
                        <tr>
                            <th v-for="(field, index) in columns" :key="index" class="px-4 py-2 border-b border-gray-300 dark:border-gray-500 text-left dark:text-gray-200">
                                <select
                                    v-if="field.type=='select'"
                                    v-model="field.filtervalue"
                                    @change="searchRow"
                                    class="form-input w-full rounded-md px-4 py-1 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                >
                                    <option value=""></option>
                                    <option v-for="(option, index) in field.options" 
                                        :value="option.value"
                                    >
                                        {{ option.item }}
                                    </option>
                                </select>

                                <input v-else
                                    v-model="field.filtervalue"
                                    @keypress="searchRow"
                                    :type="field.type"
                                    class="form-input w-full rounded-md px-4 py-1 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                                />
                            </th>
                            <th class="px-4 py-2 border-b border-gray-300 dark:border-gray-500 text-left dark:text-gray-200">
                                <BaseButton color="success" size="md" @click="clearFilters">
                                    <Icon icon="icon-park-outline:clear" class="size-6"/>
                                </BaseButton>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-600/90 divide-y divide-gray-300 dark:divide-gray-500">
                        <tr v-for="(row, rowIndex) in pageTableContent" :key="rowIndex">
                            <td v-for="(cell, cellIndex) in columns" :key="cellIndex" class="px-4 py-2 border-gray-300 dark:border-gray-500 dark:text-gray-200">
                                {{ (row[cell.name].value===undefined)?row[cell.name]:row[cell.name].value }}
                            </td>
                            <td class="px-4 py-2 border-gray-300 dark:border-gray-500 dark:text-gray-200">
                                <button @click="openFormModal(row, rowIndex)">
                                    <Icon icon="material-symbols:edit-square-outline" class="size-6 text-blue-500"/>
                                </button>
                                <button @click="openDeleteModal(row.id, rowIndex)">
                                    <Icon icon="material-symbols:delete-outline" class="size-6 text-red-600"/>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td :colspan="columns.length+1">
                                <div class="flex items-center justify-end sm:justify-between text-black dark:text-white border-gray-200 px-4 py-3 sm:px-6">
                                    <div class="hidden sm:block">
                                            <span class="font-medium">{{ (currentPage*rowsByPage)-(rowsByPage-1) }}</span>
                                            {{ $t('crud.to') }}
                                            <span class="font-medium">{{ (currentPage*rowsByPage)>allTableContents.length?allTableContents.length:(currentPage*rowsByPage) }}</span>
                                            {{ $t('crud.of') }}
                                            <span class="font-medium">{{ allTableContents.length }}</span>
                                            {{ $t('crud.results') }}
                                    </div>
                                    <div class="hidden sm:block">
                                        <input v-model="rowsByPage" @keypress="setRowsByPage" class="form-input w-10 rounded-md px-2  bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"/>
                                        {{ $t('crud.perPage') }}
                                    </div>
                                    <div class="hidden sm:block">
                                        {{ $t('crud.goToPage') }}
                                        <input v-model="goToPageInput" @keypress="goToPage" class="form-input w-7 rounded-md px-2  bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                    </div>
                                    <div>
                                        <nav class="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                                            <button :disabled="currentPage==1" @click="setPageContent(currentPage-1)" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0">
                                                <Icon icon="material-symbols:keyboard-double-arrow-left-rounded" class="size-6"></Icon>
                                            </button>
                                            <template v-if="numPages<8">
                                                <button v-for="page in numPages" @click="setPageContent(page)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" :class="[currentPage==page ? 'bg-primary-500/80 dark:bg-primary-500' : '']">{{ page }}</button>
                                            </template>
                                            <template v-else>
                                                <button @click="setPageContent(1)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" :class="[currentPage==1 ? 'bg-primary-500/80 dark:bg-primary-500' : '']">1</button>
                                                <span v-if="currentPage>3" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0 dark:text-white">...</span>
                                                <template v-else>
                                                    <button @click="setPageContent(2)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" :class="[currentPage==2 ? 'bg-primary-500/80 dark:bg-primary-500' : '']">2</button>
                                                    <button @click="setPageContent(3)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" :class="[currentPage==3 ? 'bg-primary-500/80 dark:bg-primary-500' : '']">3</button>
                                                </template>

                                                <template v-if="currentPage>3 && currentPage<(numPages-2)">
                                                    <button @click="setPageContent(2)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0">{{ currentPage-1 }}</button>
                                                    <button class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0 bg-primary-500/80 dark:bg-primary-500" >{{ currentPage }}</button>
                                                    <button @click="setPageContent(numPages-1)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" >{{ currentPage+1 }}</button>
                                                </template>

                                                <span v-if="currentPage<(numPages-2)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0 dark:text-white">...</span>
                                                <template v-else>
                                                    <button @click="setPageContent(numPages-2)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" :class="[currentPage==numPages-2 ? 'bg-primary-500/80 dark:bg-primary-500' : '']">{{ numPages-2 }}</button>
                                                    <button @click="setPageContent(numPages-1)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" :class="[currentPage==numPages-1 ? 'bg-primary-500/80 dark:bg-primary-500' : '']">{{ numPages-1 }}</button>
                                                </template>
                                                <button @click="setPageContent(numPages)" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 dark:text-white ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0" :class="[currentPage==numPages ? 'bg-primary-500/80 dark:bg-primary-500' : '']">{{ numPages }}</button>
                                            </template>
                                                
                                            <button :disabled="currentPage==numPages" @click="setPageContent(currentPage+1)" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-primary-200 dark:hover:bg-primary-400/70 focus:z-20 focus:outline-offset-0">
                                                <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" class="size-6"></Icon>
                                            </button> 
                                        </nav>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <BaseModal ref="deleteModalRef" size="sm" :header="$t('crud.confirmTitle')">
                    <template #footer>
                        <BaseButton @click="confirmDelete" color="error" size="md">{{ $t("crud.confirm") }}</BaseButton>
                    </template>
                </BaseModal>
                <BaseModal ref="formModalRef" size="md" :header="$t('crud.saveTitle')">
                    <template #content>
                        <template v-for="input in props.inputs">
                            {{ $t(`crud.${input.name}`) }}
                            <select
                                v-if="input.type=='select'"
                                v-model="input.value"
                                class="form-input w-full rounded-md px-4 py-1 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            >
                                <option value=""></option>
                                <option v-for="(option, index) in input.options" 
                                    :value="option.value"
                                >
                                    {{ option.item }}
                                </option>
                            </select>

                            <input v-else
                                v-model="input.value"
                                :type="input.type"
                                class="form-input w-full rounded-md px-4 py-1 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            />
                        </template>
                    </template>
                    <template #footer>
                        <BaseButton @click="confirmForm" size="md">{{ $t("crud.save") }}</BaseButton>
                    </template>
                </BaseModal>
                <BaseAlert ref="alertRef" />
            </div>
        </div>
    </div>
</template>