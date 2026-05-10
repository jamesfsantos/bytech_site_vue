<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Chart from "chart.js/auto";
import pedidoService from "@/services/pedidoService";
import { type PedidoModel } from "@/models/pedidoModel";
import { type ProdutosVendidosDto } from "@/types/produtosVendidosDto";

const pedidos = ref<PedidoModel[]>([]);

const produtosVendidos = ref<ProdutosVendidosDto[]>([]);

const nomeProduto = ref<string[]>([]);
const quantidadeProduto = ref<number[]>([]);

const carregarProdutos = async () => {
  try {
    const request = await pedidoService.obterProdutosVendidos();
    produtosVendidos.value = request;

    nomeProduto.value = produtosVendidos.value.map((produto) => produto.nomeProduto);

    quantidadeProduto.value = produtosVendidos.value.map((produto) => produto.quantidade);
  } catch (error) {
    console.error("Erro ao buscar produtos na API", error);
  }
};

const carregarPedidos = async () => {
  try {
    const request = await pedidoService.obterTodosPedidos();
    pedidos.value = request;
  } catch (error) {
    console.error("Erro ao buscar Pedidos na API", error);
  }
};

const pedidosAndamento = computed(() => {
  return pedidos.value.filter((p) => p.statusPedido.statusAtual === "Em andamento");
});

const pedidosPagos = computed(() => {
  return pedidos.value.filter((p) => p.statusPedido.statusAtual === "Pago");
});

const pedidosCancelados = computed(() => {
  return pedidos.value.filter((p) => p.statusPedido.statusAtual === "Cancelado");
});

function criarGraficos() {
  const pedidosCtx = document.getElementById("graficoPedidos") as HTMLCanvasElement;
  new Chart(pedidosCtx, {
    type: "doughnut",

    data: {
      labels: ["Em andamento", "Pagos", "Cancelados"],

      datasets: [
        {
          data: [
            pedidosAndamento.value.length,
            pedidosPagos.value.length,
            pedidosCancelados.value.length,
          ],

          backgroundColor: ["#ffc107", "#198754", "#dc3545"],

          borderWidth: 0,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
      },
    },
  });

  const produtosCtx = document.getElementById("graficoProdutos") as HTMLCanvasElement;
  new Chart(produtosCtx, {
    type: "bar",

    data: {
      labels: nomeProduto.value,

      datasets: [
        {
          label: "Produtos vendidos",

          data: quantidadeProduto.value,

          backgroundColor: "#0d6efd",

          borderRadius: 8,
        },
      ],
    },

    options: {
      responsive: true,

      scales: {
        x: {
          ticks: {
            color: "white",
          },

          grid: {
            color: "rgba(255,255,255,0.05)",
          },
        },

        y: {
          ticks: {
            color: "white",
          },

          grid: {
            color: "rgba(255,255,255,0.05)",
          },
        },
      },

      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
      },
    },
  });
}

onMounted(async () => {
  await carregarProdutos();
  await carregarPedidos();

  criarGraficos();
});
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="dashboard container py-4">
      <div class="mb-5">
        <h1 class="titulo">Visão Geral da BYTECH</h1>

        <p class="subtitulo">Dashboard administrativa do sistema</p>
      </div>

      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="card-dashboard andamento">
            <h5>Em andamento</h5>

            <h2>{{ pedidosAndamento.length }}</h2>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card-dashboard pagos">
            <h5>Pagos</h5>

            <h2>{{ pedidosPagos.length }}</h2>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card-dashboard cancelados">
            <h5>Cancelados</h5>

            <h2>{{ pedidosCancelados.length }}</h2>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-5">
          <div class="grafico-card">
            <h4 class="mb-4">Status dos pedidos</h4>

            <canvas id="graficoPedidos"></canvas>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="grafico-card">
            <h4 class="mb-4">Produtos vendidos</h4>

            <canvas id="graficoProdutos"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
}

.titulo {
  color: #005373;
  font-size: 2.2rem;
  font-weight: bold;
}

.subtitulo {
  color: #94a3b8;
}

.card-dashboard {
  padding: 24px;
  border-radius: 18px;
  color: white;
  transition: 0.3s;

  animation: subir 0.5s ease;
}

.card-dashboard:hover {
  transform: translateY(-5px);
}

.card-dashboard h5 {
  margin-bottom: 12px;

  font-size: 1rem;
}

.card-dashboard h2 {
  font-size: 2.5rem;

  font-weight: bold;
}

.andamento {
  background: #ca8a04;
}

.pagos {
  background: #15803d;
}

.cancelados {
  background: #b91c1c;
}

.grafico-card {
  background: #1e293b;

  padding: 24px;

  border-radius: 18px;

  animation: subir 0.6s ease;
}

canvas {
  width: 100% !important;
  max-height: 350px;
}

@keyframes subir {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
