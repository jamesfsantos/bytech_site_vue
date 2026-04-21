import axios from "axios";

const url = import.meta.env.VITE_API
const chave = import.meta.env.VITE_API_KEY

if(!url){
    console.error("ERRO: variavel de ambiente da API não encontrada");
}

const api = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {'Authorization': `Bearer ${chave}` },
});


export default api;
