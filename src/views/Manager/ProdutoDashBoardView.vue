<script setup lang="ts">
import produtoService from "@/services/produtoService.ts";
import { type ProdutoModel } from "@/models/produtoModel.ts";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { formatarMoeda } from "@/utils/utils";




const produtos = ref<ProdutoModel[]>([]);
const carregando = ref(false);

const carregarProdutos = async () => {
  try {
    carregando.value = true;
    produtos.value = await produtoService.buscarProdutos();

  } catch (erro: unknown) {
    console.error("Erro ao carregar produtos:", erro);
    Swal.fire("Erro", "Não foi possível carregar a lista de produtos", "error");
  } finally {
    carregando.value = false;
  }
};

const deletarProduto = async (id: number) => {
  const result = await Swal.fire({
    title: "Excluir Produto?",
    text: "Esta ação não pode ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {

      const sucesso = await produtoService.excluirProduto(id);

      if (sucesso) {
        await Swal.fire({
          title: "Atenção",
          text: "O produto foi removido com sucesso.",
          icon: "success",
        });

        produtos.value = produtos.value.filter(p => p.id !== id);
      } else {
        throw new Error("Falha na exclusão");
      }
    } catch (error) {
      console.error("Erro ao excluir produto", error);
      Swal.fire("Erro", "Não foi possível excluir o produto.", "error");
    }
  }
};


onMounted(() => {
  carregarProdutos();
});
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
          <th>Marca</th>
          <th>Quantidade</th>
          <th>Ativo?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in produtos" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ formatarMoeda(item.precoVenda) }}</td>
          <td>{{ item.categoria.nome }}</td>
          <td>{{ item.marca }}</td>
          <td>{{ item.estoqueAtual }}</td>
          <td>{{ item.ativo ? 'Sim' : 'Não' }}</td>
          <td class="d-flex justify-content-evenly">
            <RouterLink class="btn btn-warning" :to="`/manager/produto/editar/${item.id}`"
              >Editar</RouterLink
            >
            &nbsp;
            <button class="btn btn-danger" @click="deletarProduto(item.id)">Deletar</button>
          </td>
        </tr>
      </tbody>

      <RouterLink class="mt-2 btn btn-primary" to="/manager/produto/cadastro">Novo Produto</RouterLink>
    </table>
    <div v-else>Nenhum produto encontrado</div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.tabela {
  width: 100%;
  border-radius: 5px;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: lightgray;
  overflow: hidden;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

h2 {
  color: white;
}

/* zebra striping */
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #e6f2ff;
  transition: 0.2s;
}

td:last-child {
  text-align: center;
}


</style>
