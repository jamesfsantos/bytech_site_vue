<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import usuarioService from "@/services/usuarioService";
import { computed, onMounted, ref } from "vue";
import { limparCarrinho, listaCarrinho, removerDoCarrinho } from "@/stores/carrinhoStores";
import type { PedidoModel } from "@/models/pedidoModel";
import { formatarMoeda } from "@/utils/utils";
import pedidoService from "@/services/pedidoService";
import Swal from "sweetalert2";

const router = useRouter();
const usuario = ref();
const email = localStorage.getItem("user_email") || "";

const buscarUsuario = async () => {
  try {
    const dados = await usuarioService.buscarUsuario(email);
    usuario.value = dados;
  } catch (error) {
    throw error;
  }
};

const entrega = ref({
  endereco: "",
  complemento: "",
  cidade: "",
  cep: "",
});

const totalCarrinho = computed(() => {
  return listaCarrinho.value.reduce((acc, item) => acc + item.precoVenda * item.quantidade, 0);
});

async function registrarPedido() {
  const pedido: PedidoModel = {
    id: 0,
    usuarioId: usuario.value.id,
    dataPedido: new Date(),
    valorTotalPedido: totalCarrinho.value,
    nomeUsuario: usuario.value.nome,
    email: email,
    celular: usuario.value.celular,
    cpf: usuario.value.cpf,
    endereco: entrega.value.endereco,
    cep: entrega.value.cep,
    cidade: entrega.value.cidade,
    complemento: entrega.value.complemento,
    itens: listaCarrinho.value.map((item) => ({
      id: 0,
      produtoId: item.id,
      quantidade: item.quantidade,
      valor: item.precoVenda,
      valorTotal: item.precoVenda * item.quantidade,
      nome: item.nome,
    })),
  };

  try {
    const sucesso = await pedidoService.criarPedido(pedido);

    if (sucesso) {
      Swal.fire({
        title: "Sucesso",
        text: 'Pedido realizado com sucesso!',
        icon: "success",
        confirmButtonText: 'Ver meu pedido.'
      });
      limparCarrinho();
      router.push('/pedidos')
    }
  } catch (error) {
    console.error("Erro ao registrar pedido:", error);
    alert("Ocorreu um erro ao registrar o pedido");
  }
}

onMounted(async () => {
  await buscarUsuario();
});
</script>

<template>
  <main class="main-revisao" v-if="usuario">
    <div class="rev-background">
      <h1 class="h1-rev">Revisao do Pedido</h1>
      <br />

      <div class="rev-grid">
        <form class="form">
          <div class="inf-nf">
            <h2>Informações na nota fiscal do pedido:</h2>
            <div class="mb-3 col-md-8">
              <label>Nome:</label><br />
              <input type="text" class="form-control" v-model="usuario.nome" disabled />
            </div>
            <div class="mb-3 col-md-3">
              <label>CPF:</label>
              <input
                type="text"
                class="form-control"
                v-model="usuario.cpf"
                placeholder="xxx.xxx.xxx-xx"
                maxlength="14"
                disabled
              />
            </div>
            <div class="mb-3 col-md-6">
              <label>Email:</label>
              <input type="email" v-model="usuario.email" class="form-control" disabled />
            </div>
            <div class="mb-3 col-md-6">
              <label>Celular:</label>
              <input type="text" v-model="usuario.celular" class="form-control" disabled />
            </div>
          </div>

          <div class="end-envio">
            <h2>Seu pedido será entregue em:</h2>
            <div class="mb-3 col-md-12">
              <label>Endereço:</label>
              <input type="text" v-model="entrega.endereco" class="form-control" />
            </div>
            <div class="mb-3 col-md-12">
              <label>Complemento:</label>
              <input type="text" v-model="entrega.complemento" class="form-control" />
            </div>
            <div class="mb-3 col-md-6">
              <label>Cidade:</label>
              <input type="text" v-model="entrega.cidade" class="form-control" />
            </div>
            <div class="mb-3 col-md-6">
              <label>CEP:</label>
              <input type="text" v-model="entrega.cep" class="form-control" />
            </div>
          </div>
        </form>

        <div class="rev-produto">
          <h2 class="p-3">Produtos:</h2>
          <div class="lista-produtos">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Preço Unidade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="produto in listaCarrinho" :key="produto.id">
                <tr>
                  <td>{{ produto.quantidade }}</td>
                  <td>{{ produto.nome }}</td>
                  <td>{{ produto.marca }}</td>
                  <td>{{ formatarMoeda(produto.precoVenda) }}</td>
                  <td @click="removerDoCarrinho(produto.id)">
                    <i class="fa-solid fa-trash lixeira" style="color: rgb(255, 0, 0)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="resumo-compra" v-for="produto in listaCarrinho" :key="produto.id">
          <h2>Resumo do pedido:</h2>
          <br />
          <p>Valor dos produtos:</p>
          {{ produto.nome }} = R${{ produto.precoVenda * produto.quantidade }}
          <br />
          <h2>Total: {{ formatarMoeda(totalCarrinho) }}</h2>
          <br />
          <p>Deseja finalizar o pedido ?</p>
          <div class="btn-finalizar-div">
            <button class="btn btn-success" @click="registrarPedido()">Registrar Pedido</button>
            <RouterLink to="/carrinho" class="btn btn-primary">Voltar para o carrinho</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* =========================
   BASE
========================= */

.main-revisao {
  background: #f4f8fb;
  min-height: 100vh;
  padding: 30px 15px;
  display: flex;
  justify-content: center;
}

.rev-background {
  width: 100%;
  max-width: 1400px;
}

/* =========================
   TITULO
========================= */

.h1-rev {
  background: #005373;
  color: #fff;
  text-align: center;
  padding: 18px;
  border-radius: 14px;
  margin-bottom: 25px;
}

/* =========================
   GRID PRINCIPAL
========================= */

.rev-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
}

/* =========================
   CARDS BASE
========================= */

.rev-grid > div,
.form {
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 83, 115, 0.08);
  border: 1px solid #dcecf3;
}

/* =========================
   FORMULÁRIO
========================= */

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.inf-nf,
.end-envio {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* inputs */
input {
  width: 100%;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #cfe3ee;
  padding: 0 12px;
  outline: none;
}

input:focus {
  border-color: #005373;
}

/* =========================
   TÍTULOS INTERNOS
========================= */

.rev-grid h2 {
  background: #005373;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
}

/* =========================
   PRODUTOS
========================= */

.rev-produto {
  display: flex;
  flex-direction: column;
}

.table {
  font-size: 14px;
}

.lixeira {
  cursor: pointer;
  transition: 0.2s;
}

.lixeira:hover {
  transform: scale(1.2);
}

/* =========================
   SIDEBAR (RESUMO)
========================= */

.resumo-compra {
  position: sticky;
  top: 20px;
  height: fit-content;

  background: #ffffff;
  border-radius: 18px;
  padding: 20px;

  box-shadow: 0 8px 25px rgba(0, 83, 115, 0.12);
  border: 1px solid #dcecf3;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* =========================
   BOTÕES
========================= */

.btn-finalizar-div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

button,
.btn {
  border-radius: 12px !important;
  font-weight: 600;
}

/* botão verde moderno */
.btn-success {
  background: #006e1d !important;
  border: none !important;
}

.btn-success:hover {
  background: #009a2a !important;
}

/* botão voltar */
.btn-primary {
  background: #005373 !important;
  border: none !important;
}

.btn-primary:hover {
  background: #0a6b92 !important;
}

/* =========================
   RESPONSIVO
========================= */

@media (max-width: 900px) {
  .rev-grid {
    grid-template-columns: 1fr;
  }

  .resumo-compra {
    position: relative;
    top: auto;
  }
}
</style>
