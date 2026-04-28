<script setup lang="ts">

import { CategoriaModel } from '@/models/categoriaModel';
import produtoService from '@/services/produtoService';

import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const categorias = ref<CategoriaModel[]>([])
const carregarCategorias = async () => {
  try {

    //categorias.value = ;
  }
  catch (erro: unknown) {
    console.error("Erro ao carregar produtos:", erro);
    Swal.fire('Erro', 'Não foi possível carregar a lista de categorias', 'error');
  }

};

onMounted(() => {
  carregarProdutos()
})
</script>

<template>
  <div class="container">
    <h1>Cadastro de Produto!</h1>
    <section class="cadastro">
      <form>
        <fieldset>
          <label for="nomeProduto">Nome</label><br>
          <input
            type="text"
            placeholder="Insira o nome do Produto..."
            id="nomeProduto"
          />
          <label for="categoria">Categoria</label>
          <select id="categoria" name="categoria" v-for=""></select>

        </fieldset>
      </form>
    </section>
  </div>
</template>

<style scoped>
.cadastro{
  border: 1px dashed black;
  padding: 10px;
}
</style>
