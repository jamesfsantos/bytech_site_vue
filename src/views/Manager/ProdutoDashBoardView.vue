<script setup lang="ts">
import produtoService from "@/services/produtoService.ts";
import { type ProdutoModel } from "@/models/produtoModel.ts";
import { ref, onMounted, computed } from "vue";
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

const produtosAtivos = computed(() =>
  produtos.value.filter(p => p.ativo)
)

const produtosInativos = computed(() =>
  produtos.value.filter(p => !p.ativo)
)

const abaAtual = ref('ativos');





onMounted(() => {
  carregarProdutos();
});
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Gerenciamento de Produtos</h2>
    </div>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: abaAtual === 'ativos' }" @click="abaAtual = 'ativos'">
          Ativos <span class="badge bg-success">{{ produtosAtivos.length }}</span>
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ active: abaAtual === 'inativos' }" @click="abaAtual = 'inativos'">
          Inativos <span class="badge bg-danger">{{ produtosInativos.length }}</span>
        </button>
      </li>
    </ul>

    <div v-if="carregando">Carregando...</div>

    <div v-else>
      <table v-if="(abaAtual === 'ativos' ? produtosAtivos : produtosInativos).length > 0" class="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in (abaAtual === 'ativos' ? produtosAtivos : produtosInativos)" :key="item.id">
            <td>{{ item.nome }}</td>
            <td>{{ formatarMoeda(item.precoVenda) }}</td>
            <td>{{ item.categoria?.nome }}</td>
            <td>{{ item.marca }}</td>
            <td>{{ item.estoqueAtual }}</td>
            <td class="d-flex justify-content-evenly">
              <RouterLink class="btn btn-warning btn-sm" :to="`/manager/produto/editar/${item.id}`">Editar</RouterLink>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <RouterLink class="btn btn-primary m-2" to="/manager/produto/cadastro">Novo Produto</RouterLink>
        </tfoot>
      </table>

      <div v-else class="text-white text-center mt-4">
        Nenhum produto {{ abaAtual }} encontrado.
      </div>
    </div>
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
