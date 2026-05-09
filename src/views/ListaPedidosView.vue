<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { PedidoModel } from "@/models/pedidoModel";
import pedidoService from "@/services/pedidoService";
import { formatarMoeda } from "@/utils/utils";
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";

const pedidos = ref<PedidoModel[]>([]);
const email = localStorage.getItem("user_email") || "";
const { estaLogado } = useAuth();

const abaAtiva = ref("andamento");

const carregarPedidos = async () => {
  try {
    const dados = await pedidoService.obterPedidosEmail(email);
    pedidos.value = dados;
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
  }
};

const pedidosEmAndamento = computed(() =>
  pedidos.value.filter((p) => p.statusPedido.statusAtual === "Em andamento"),
);

const pedidosFinalizados = computed(() =>
  pedidos.value.filter((p) => p.statusPedido.statusAtual === "Pago"),
);

const pedidosCancelados = computed(() =>
  pedidos.value.filter((p) => p.statusPedido.statusAtual === "Cancelado"),
);

const pedidosFiltrados = computed(() => {
  if (abaAtiva.value === "andamento") return pedidosEmAndamento.value;
  if (abaAtiva.value === "finalizados") return pedidosFinalizados.value;
  if (abaAtiva.value === "cancelados") return pedidosCancelados.value;
  return [];
});

const cancelarPedido = async (idPedido: number) => {
  const resultado = await Swal.fire({
    title: "Tem certeza?",
    text: "Você poderá alterar depois.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, cancelar!",
    cancelButtonText: "Voltar",
  });
  if (resultado.isConfirmed) {
    try {
      const ID_STATUS_CANCELADO = 3;

      await pedidoService.atualizarStatus(idPedido, ID_STATUS_CANCELADO);

      await Swal.fire("Cancelado!", "Seu pedido foi cancelado com sucesso.", "success");

      await carregarPedidos();
    } catch (error) {
      console.error(error);
      Swal.fire("Erro", "Não foi possível cancelar o pedido.", "error");
    }
  }
};


const reverterPedido = async (idPedido: number) => {
  const resultado = await Swal.fire({
    title: "Tem certeza?",
    text: "O seu pedido estará em andamento",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, reverter!",
    cancelButtonText: "Voltar",
  });
  if (resultado.isConfirmed) {
    try {
      const ID_STATUS_ANDAMENTO = 1;

      await pedidoService.atualizarStatus(idPedido, ID_STATUS_ANDAMENTO);

      await Swal.fire("Revertido!", "Seu pedido foi revertido com sucesso.", "success");

      await carregarPedidos();
    } catch (error) {
      console.error(error);
      Swal.fire("Erro", "Não foi possível cancelar o pedido.", "error");
    }
  }
};

onMounted(() => {
  carregarPedidos();
});
</script>

<template>
  <div class="background">
    <div class="pedidos-container" v-if="estaLogado">
      <h1 class="mb-4 text-center">Meus Pedidos</h1>

      <ul class="nav nav-pills justify-content-center mb-4">
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: abaAtiva === 'andamento' }"
            @click="abaAtiva = 'andamento'"
          >
            Em Andamento ({{ pedidosEmAndamento.length }})
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: abaAtiva === 'finalizados' }"
            @click="abaAtiva = 'finalizados'"
          >
            Histórico ({{ pedidosFinalizados.length }})
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link btn-cancelado"
            :class="{ active: abaAtiva === 'cancelados' }"
            @click="abaAtiva = 'cancelados'"
          >
            Cancelados ({{ pedidosCancelados.length }})
          </button>
        </li>
      </ul>

      <div v-for="pedido in pedidosFiltrados" :key="pedido.id" class="card mb-4 shadow-sm">
        <div class="card-header d-flex justify-content-between">
          <span
            ><strong>Pedido #{{ pedido.id }}</strong></span
          >
          <span
            ><b>Status: {{ pedido.statusPedido.statusAtual }}</b></span
          >
          <span>Data: {{ new Date(pedido.dataPedido).toLocaleDateString() }}</span>
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
                <td class="text-success text-nowrap">
                  <strong>{{ formatarMoeda(pedido.valorTotalPedido) }}</strong>
                </td>
              </tr>
            </tfoot>
          </table>

          <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div class="small text-muted">
              <strong>Entregar em:</strong> {{ pedido.endereco }}, {{ pedido.cidade }}
            </div>

            <div v-if="pedido.statusPedido.statusAtual === 'Em andamento'">
              <RouterLink class="btn btn-success" :to="`/pagamento/${pedido.id}`">
                Ir para Pagamento
              </RouterLink>
              <button class="btn btn-danger ms-3" @click="cancelarPedido(pedido.id)">
                Cancelar Pedido
              </button>
            </div>

            <div v-else-if="pedido.statusPedido.statusAtual === 'Pago'">
              <span class="badge bg-success p-2">Pagamento Confirmado! ✅</span>
            </div>

            <div v-else>
              <span class="badge bg-secondary p-2">Pedido Cancelado</span>
              <button class="btn btn-success ms-3" @click="reverterPedido(pedido.id)">Reverter</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="pedidosFiltrados.length === 0" class="alert alert-info text-center">
        Nenhum pedido encontrado nesta seção.
      </div>
    </div>

    <div class="container text-center mt-5 vh-100" v-else>
      <h1 class="text-white">Faça o login para exibir seus pedidos</h1>
      <RouterLink class="btn btn-primary mt-3" to="/login">Ir para o Login</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.background {
  background: radial-gradient(circle at top, #1a2a33 0%, #111 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Melhor para listas longas */
  padding-top: 50px;
  width: 100%;
  min-height: 100vh;
}

.pedidos-container {
  width: 75%;
}

h1 {
  color: white;
}

.card {
  border: none;
  background-color: #f8f9fa;
  overflow: hidden;
}

.card-header {
  background-color: #3b8cbe !important;
  color: white !important;
}

.nav-pills .nav-link {
  color: #3b8cbe;
  border: 1px solid #3b8cbe;
  margin: 0 5px;
  background: transparent;
  transition: all 0.2s ease;
}

.nav-pills .nav-link.active {
  background-color: #3b8cbe;
  color: white;
  border-color: #3b8cbe;
}

.btn-cancelado.active {
  background-color: #f11212;
  border-color: #f11212;
}

.btn-cancelado:hover {
  border-color: #f11212;
  color: #f11212;
}

@media (max-width: 900px) {
  .pedidos-container {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .pedidos-container {
    width: 100%;
    padding: 15px;
  }
  .nav-pills .nav-link {
    margin-bottom: 10px;
    width: 100%;
  }
}
</style>
