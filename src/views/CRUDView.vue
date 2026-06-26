<script setup>
    import {ref} from "vue";
    import CRUDComponent from '@/components/CRUDComponent.vue'
    import { onBeforeMount  } from "vue";
    import {getRows, addRow, deleteByID, updateByID} from "@/utils/index.js";


    const tableContents = ref([]);
    const columns=[
        {
            name:'id',
            title:'ID',
            type:"text",
            filtervalue:""
        },
        {
            name:'name',
            title:'Nombre',
            type:"text",
            filtervalue:""
        },
        {
            name:'email',
            title:'Correo',
            type:"text",
            filtervalue:""
        },
        {
            name:'role',
            title:'Rol',
            type:"select",
            filtervalue:"",
            options:[
                {
                    value:1,
                    item:'Admin'
                },
                {
                    value:2,
                    item:'User'
                }
            ]
        }
    ];

    const inputs=[
        {
            label:"Nombre",
            name:'name',
            type:"text",
            value:"",
        },
        {
            label:"Correo",
            name:'email',
            type:"text",
            value:"",
        },
        {
            label:"Rol",
            name:'role',
            type:"select",
            value:"",
            options:[
                {
                    value:1,
                    item:'Admin'
                },
                {
                    value:2,
                    item:'User'
                },
            ]
        },
        {
            label:"Contraseña",
            name:'password',
            type:"password",
            value:"",
        },
    ]

    const deleteRow=async (id, index)=>{
        const response=await deleteByID(`delete_user/${id}`);
        if(response!==null){
            const newTableContents=[...tableContents.value];
            newTableContents.splice(index,1);
            tableContents.value=newTableContents;
            return true;
        }else{
            return false;
        }
    }

    const createRow=async ()=>{
        //tableContents.value = [];
        const data= {
            name:inputs[0].value,
            email:inputs[1].value,
            role:inputs[2].value,
            password:inputs[3].value
        }

        const response=await addRow("create_user", data);
        if(response!==null){
            tableContents.value.push(response);
            return true;
        }else{
            return false;
        }
    }

    const updateRow=async (id, index)=>{
        const data= {
            name:inputs[0].value,
            email:inputs[1].value,
            role:inputs[2].value,
            password:inputs[3].value
        }
        
        const response=await updateByID(`update_user/${id}`, data);
        if(response!==null){

            //const newTableContents=[...tableContents.value];
            //newTableContents.splice(index,1);
            //newTableContents.push(data);
            tableContents.value[index].name=data.name;
            tableContents.value[index].email=data.email;
            tableContents.value[index].role=data.role;
            tableContents.value[index].password=data.password;
            return true;
        }else{
            return false;
        }
    }

    onBeforeMount (async () => {
        const rows=await getRows("get_users");
        tableContents.value.push(...rows);
    })
    
</script>
<template>
    <div class="mt-5">
        <p class="title-text mb-3">CRUD</p>
        <div class="overflow-x-auto">
            <CRUDComponent
                :tableContents="tableContents"
                :columns="columns"
                :inputs="inputs"
                :deleteRow="deleteRow"
                :addRow="createRow"
                :updateRow="updateRow"
            />
        </div>
    </div>
</template>