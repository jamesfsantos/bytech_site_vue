import {ref, watch} from 'vue';
import { type ProdutoModel } from '@/models/produtoModel';

export interface ItemCarrinho extends ProdutoModel {
    quantidade: number
}

const dadosSalvo = localStorage.getItem('carrinho_usuario')
export const listaCarrinho = ref<ItemCarrinho[]>(dadosSalvo ? JSON.parse(dadosSalvo) : []);

watch(listaCarrinho, (novaLista) => {
  localStorage.setItem('carrinho_usuario', JSON.stringify(novaLista))
}, {deep: true})

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
