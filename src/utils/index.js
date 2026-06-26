import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_BASE_URL || `http://${location.host.split(":")[0]}:8000`}/api/`

export const login=async (url, data)=>{
    const options={
        method:"POST",
        url:`${baseUrl}${url}`,
        headers:{
            'Content-Type':'application/json'
        },
        data:data
    }
    try{
        const respuesta=await axios.request(options);
        console.log("respuesta", respuesta);
        return respuesta;
    }catch(error){
        return error;
    }
}

export const getRows=async (url)=>{
    const options={
        method:"GET",
        url:`${baseUrl}${url}`,
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('access-token')}`
        }
    }
    try{
        const respuesta=await axios.request(options);
        return respuesta.data;
    }catch(error){

    }
}
export const addRow=async (url, data)=>{
    const options={
        method:"POST",
        url:`${baseUrl}${url}`,
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('access-token')}`
        },
        data:data
    }
    try{
        const respuesta=await axios.request(options);
        return respuesta.data;
    }catch(error){
        console.log(error);
        return null;
    }
}
export const deleteByID=async (url)=>{
    const options={
        method:"DELETE",
        url:`${baseUrl}${url}`,
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('access-token')}`
        }
    }
    try{
        const respuesta=await axios.request(options);
        return respuesta.data;
    }catch(error){
        console.log(error);
        return null;
    }
}
export const updateByID=async (url, data)=>{
    const options={
        method:"PUT",
        url:`${baseUrl}${url}`,
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('access-token')}`
        },
        data:data
    }
    try{
        const respuesta=await axios.request(options);
        return respuesta.data;
    }catch(error){
        console.log(error);
        return null;
    }
}