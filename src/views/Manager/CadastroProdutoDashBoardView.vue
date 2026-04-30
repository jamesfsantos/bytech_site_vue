<script setup lang="ts">

import categoriaService from '@/services/categoriaService';
import produtoService from '@/services/produtoService';

import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';


const categorias = ref<CategoriaModel[]>([])
const formularioValido = ref(false)

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
  categoriaId: "" as string | number,
  marca: "",
});


const cadastrarProduto = async (event: Event) => {
  const form = event.target as HTMLFormElement
  formularioValido.value = true;

  if(!form.checkValidity())
    return

    console.log('Iniciando cadastro de produto!')
  try {
    const dados = {
      ...formularioConta.value,
      categoriaId: Number(formularioConta.value.categoriaId)
    }
    const cadastroProduto = await produtoService.cadastrarProduto(dados);

    if (cadastroProduto) {

      Swal.fire({
        title: "Cadastro realizado com sucesso!",
        text: "",
        icon: "success",
        draggable: true
      });
      formularioValido.value = false
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao cadastrar o produto!",
      });
    }
  }
  catch (erro: unknown) {
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
      <form

        class="row g-3"
        :class="{'was-validated': formularioValido}"
        @submit.prevent="cadastrarProduto"
        novalidate
      >
        <div class="col-12">
          <label for="nome" class="form-label">Nome</label>
          <input v-model="formularioConta.nome" type="text" class="form-control" id="nome" placeholder="Digite o nome do produto..." required>
          <div class="invalid-feedback">O nome é obrigatório</div>
        </div>
        <div class="col-12">
          <label for="imagem" class="form-label">Imagem</label>
          <input v-model="formularioConta.imagem" type="text" class="form-control" id="inputAddress" placeholder="Insira a URL da sua imagem" required>
          <div class="invalid-feedback">Insira uma URL válida para a sua imagem</div>
        </div>
        <div class="col-12">
          <label for="precoVenda" class="form-label">Preço venda</label>
          <input v-model="formularioConta.precoVenda" type="number" step="0.01" class="form-control" id="preco" placeholder="Informe o preço do produto" required>
          <div class="invalid-feedback">Informe um preço válido</div>
        </div>
        <div class="col-md-4">
          <label for="estoqueAtual" class="form-label">Estoque atual</label>
          <input v-model="formularioConta.estoqueAtual" type="text" class="form-control" id="estoque">
        </div>
        <div class="col-md-4">
          <label for="marca" class="form-label">Marca</label>
          <input v-model="formularioConta.marca" type="text" class="form-control" id="marca" required>
        </div>
        <div class="col-md-4">
          <label for="categoria" class="form-label">Categoria</label>
          <select id="categoria" class="form-select" v-model="formularioConta.categoriaId">
            <option value="" disabled>Selecione uma opção</option>
            <option  v-for="categoria in categorias" :key="categoria.id" :value="categoria.id" required>
              {{ categoria.nome }}
            </option>
            <div class="invalid-feedback">Informe um categoria</div>
          </select>
        </div>
        <div class="col-md-12">
          <label for="descricao" class="form-label">Descrição</label>
          <textarea v-model="formularioConta.descricao" class="form-control" id="descricao" rows="5"></textarea>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Salvar Produto</button>
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
