import {ref} from 'vue';
import { type ProdutoModel } from '@/models/produtoModel';



export interface ItemCarrinho extends ProdutoModel {
    quantidade: number
}

export const listaCarrinho = ref<ItemCarrinho[]>([]);

export function adicionarAoCarrinho(produto: ProdutoModel){
    const itemExistente = listaCarrinho.value.find(p => p.id === produto.id)

    if(itemExistente){
        if(itemExistente.quantidade < produto.estoqueAtual){
            itemExistente.quantidade++;
        }
    } else {
        if(produto.estoqueAtual > 0){
            listaCarrinho.value.push({ ...produto, quantidade: 1});
        }
    }
    
}

export function removerDoCarrinho(id: number) {
  listaCarrinho.value = listaCarrinho.value.filter(produto => produto.id !== id);
}

export function limparCarrinho(){
    listaCarrinho.value = [];
}