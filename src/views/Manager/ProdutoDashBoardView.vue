<script setup lang="ts">
import produtoService from '@/services/produtoService.ts';
import { ProdutoModel } from '@/models/produtoModel.ts';
import {ref, onMounted} from 'vue'
import Swal from 'sweetalert2';



const produtos = ref<ProdutoModel[]>([])
const carregando = ref(false);


const carregarProdutos = async () => {
  try {
    carregando.value = true;
    produtos.value = await produtoService.buscarProdutos();
  }
  catch (erro: unknown) {
    console.error("Erro ao carregar produtos:", erro);
    Swal.fire('Erro', 'Não foi possível carregar a lista de produtos', 'error');
  }
  finally {
    carregando.value = false;
  }
};



onMounted(() => {
  carregarProdutos()
})

</script>

<template>
    <div class="container">
      <h2>Lista de Produtos</h2>

      <div v-if="carregando">Carregando...</div>

      <table v-else-if="produtos.length > 0" class="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in produtos" :key="item.id">
                <td>{{ item.nome }}</td>
                <td>{{ item.precoVenda }}</td>
                <td>{{ item.categoria.nome }}</td>
                <td>{{ item.estoqueAtual }}</td>
                <td><button class="btn btn-warning">Editar</button></td>
            </tr>
          </tbody>
      </table>
      <div v-else>Nenhum produto encontrado</div>


    </div>
</template>

<style scoped>
.container
{
  padding: 20px;
}
.tabela
{
  width: 100%;
  border-collapse:
  collapse;
  margin-top: 10px;
}

th, td
{
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th
{
  background-color: #f4f4f4;
}
</style>
