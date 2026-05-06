<script setup lang="ts">
import type { PedidoModel } from "@/models/pedidoModel";
import pedidoService from "@/services/pedidoService";
import { formatarMoeda } from "@/utils/utils";
import { onMounted, ref } from "vue";
import { useAuth } from '@/composables/useAuth'

const pedidos = ref<PedidoModel[]>([]);
const email = localStorage.getItem("user_email") || "";

const { estaLogado }= useAuth();


const carregarPedidos = async () => {
  try {
    const dados = await pedidoService.obterPedidosEmail(email);
    pedidos.value = dados;
  } catch (error) {
    throw error;
  }
};

const cont = ref(0);

onMounted(() => {
  carregarPedidos();
});
</script>
<template>
  <div class="container mt-5  " v-if="estaLogado">
    <h1 class="mb-4">Meus Pedidos</h1>

    <div v-if="pedidos.length === 0" class="alert alert-info">
      Você ainda não realizou nenhum pedido.
    </div>

    <div v-for="pedido in pedidos" :key="pedido.id" class="card mb-4 shadow-sm">
      <div class="card-header bg-dark text-white d-flex justify-content-between">
        <span
          ><strong>Pedido #{{ pedido.id }}</strong></span
        >
        <span>Data: {{ new Date(pedido.dataPedido).toLocaleDateString() }}</span>
        <span>Status: {{ pedido.statusPedido.statusAtual }}</span>
      </div>

      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Valor Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pedido.itens" :key="item.id">
              <td>{{ item.nome }}</td>
              <td>{{ item.quantidade }}</td>
              <td>{{ formatarMoeda(item.valor) }}</td>
              <td>{{ formatarMoeda(item.valorTotal) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end"><strong>Total do Pedido:</strong></td>
              <td class="text-success">
                <strong>{{ formatarMoeda(pedido.valorTotalPedido) }}</strong>
              </td>
            </tr>
          </tfoot>
        </table>

        <div class="mt-2 small text-muted">
          <strong>Entregar em:</strong> {{ pedido.endereco }}, {{ pedido.cidade }} - CEP:
          {{ pedido.cep }}
        </div><br>
        <div>
          <RouterLink class="btn btn-success" to="/pagamento">Ir para pagamento</RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5 vh-100" v-else>
    <h1>Faça o login para exibir seus pedidos</h1>
    <RouterLink class="btn btn-primary" to="/login">Ir para o Login...</RouterLink>
  </div>
</template>
<style scoped>
footer{

}
</style>
