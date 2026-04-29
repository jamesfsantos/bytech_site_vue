<script setup lang="ts">

import categoriaService from '@/services/categoriaService';

import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';


const categorias = ref<CategoriaModel[]>([])

const categoriaSelecionada = ref<number | string>('');
const carregarCategorias = async () => {
  try {
    categorias.value = await categoriaService.ObterCategorias()
  }
  catch (erro: unknown) {
    console.error("Erro ao carregar categorias:", erro);
    Swal.fire('Erro', 'Não foi possível carregar a lista de categorias', 'error');
  }
};


const formularioConta = ref({
  nome: "",
  imagem: "",
  precoVenda: 0,
  estoqueAtual: 0,
  descricao: "",
  categoriaId: 0,
  marca: "",
});

const cadastrarProduto = async () => {
  try {

  }
  catch (erro: unknown){
    console.error(erro)
  }
}

// Nome = produtoDto.Nome,
// Marca = produtoDto.Marca,
// CategoriaId = produtoDto.CategoriaId,
// Descricao = produtoDto.Descricao,
// EstoqueAtual = produtoDto.EstoqueAtual,
// PrecoVenda = produtoDto.PrecoVenda,
// Imagem = produtoDto.Imagem,


onMounted(() => {
  carregarCategorias()
})
</script>

<template>
  <div class="container">
    <h1>Cadastro de Produto!</h1>
    <section class="cadastro">
      <form class="row g-3">
        <div class="col-12">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" class="form-control" id="nome" placeholder="Digite o nome do produto...">
        </div>
        <div class="col-12">
          <label for="imagem" class="form-label">Imagem</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Insira a URL da sua imagem">
        </div>
        <div class="col-12">
          <label for="precoVenda" class="form-label">Preço venda</label>
          <input type="text" class="form-control" id="preco" placeholder="Informe o preço do produto">
        </div>
        <div class="col-md-4">
          <label for="estoqueAtual" class="form-label">Estoque atual</label>
          <input type="text" class="form-control" id="estoque">
        </div>
        <div class="col-md-4">
          <label for="marca" class="form-label">Marca</label>
          <input type="text" class="form-control" id="marca">
        </div>
        <div class="col-md-4">
          <label for="categoria" class="form-label">Categoria</label>
          <select id="categoria" class="form-select" v-model="categoriaSelecionada">
            <option value="" disabled>Selecione uma opção</option>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                {{ categoria.nome }}
              </option>
          </select>
        </div>
        <div class="col-md-12">
          <label for="descricao" class="form-label">Descrição</label>
            <textarea class="form-control" id="descricao" rows="5"></textarea>
        </div>

      </form>
    </section>
  </div>
</template>

<style scoped>
.cadastro {
  border: 1px dashed black;
  padding: 10px;
}
</style>
