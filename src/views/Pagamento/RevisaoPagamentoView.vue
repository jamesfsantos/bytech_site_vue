<script setup lang="ts">
import { useRouter } from "vue-router";
import usuarioService from "@/services/usuarioService";
import { computed, onMounted, ref } from "vue";
import { limparCarrinho, listaCarrinho, removerDoCarrinho } from "@/stores/carrinhoStores";
import type { PedidoModel } from "@/models/pedidoModel";
import { formatarMoeda } from "@/utils/utils";
import pedidoService from "@/services/pedidoService";
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";


const { estaLogado } = useAuth();
const router = useRouter();

const usuario = ref();
const carregando = ref(true);
const email = localStorage.getItem("user_email") || "";

const buscarUsuario = async () => {
  try {
    const dados = await usuarioService.buscarUsuario(email);
    usuario.value = dados;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    Swal.fire("Erro", "Não foi possível carregar seus dados.", "error");
  }
};

const totalCarrinho = computed(() => {
  return listaCarrinho.value.reduce((acc, item) => acc + item.precoVenda * item.quantidade, 0);
});

async function registrarPedido() {
  if (!usuario.value) return;

  const pedido: PedidoModel = {
    id: 0,
    usuarioId: usuario.value.id,
    dataPedido: new Date(),
    valorTotalPedido: totalCarrinho.value,
    nomeUsuario: usuario.value.nome,
    email: email,
    celular: usuario.value.celular,
    cpf: usuario.value.cpf,
    endereco: usuario.value.endereco,
    cep: usuario.value.cep,
    cidade: usuario.value.cidade,
    complemento: usuario.value.complemento,
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
      await Swal.fire({
        title: "Sucesso",
        text: "Pedido realizado com sucesso!",
        icon: "success",
        confirmButtonColor: "#005373",
        confirmButtonText: "Ver meu pedido",
      });
      limparCarrinho();
      router.push("/pedidos");
    }
  } catch (error) {
    console.error("Erro ao registrar pedido:", error);
    Swal.fire("Erro", "Ocorreu um erro ao registrar o pedido.", "error");
  }
}

onMounted(async () => {

  if (!estaLogado.value) {
    await Swal.fire({
      title: "Acesso Restrito",
      text: "Você precisa estar logado para revisar o pagamento.",
      icon: "warning",
      confirmButtonColor: "#005373",
      confirmButtonText: "Ir para Login",
      allowOutsideClick: false,
    });
    router.push("/login");
    return;
  }


  await buscarUsuario();
  carregando.value = false;
});
</script>

<template>
  <main class="main-revisao">
    <div v-if="carregando" class="loading-state">
      <div class="spinner"></div>
      <p>Validando acesso...</p>
    </div>

    <div class="rev-background" v-else-if="usuario">
      <h1 class="h1-rev">Revisão do Pedido</h1>

      <div class="rev-grid">
        <form class="form">
          <div class="inf-nf">
            <h2>Informações na nota fiscal do pedido:</h2>
            <div class="mb-3 col-md-8">
              <label>Nome:</label>
              <input type="text" class="form-control" v-model="usuario.nome" disabled />
            </div>
            <div class="mb-3 col-md-4">
              <label>CPF:</label>
              <input type="text" class="form-control" v-model="usuario.cpf" disabled />
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
              <input type="text" v-model="usuario.endereco" class="form-control" disabled />
            </div>
            <div class="mb-3 col-md-12">
              <label>Complemento:</label>
              <input type="text" v-model="usuario.complemento" class="form-control" disabled />
            </div>
            <div class="mb-2 d-flex gap-2">
              <div class="col-md-8">
                <label>Cidade:</label>
                <input type="text" v-model="usuario.cidade" class="form-control" disabled />
              </div>
              <div class="col-md-4">
                <label>CEP:</label>
                <input type="text" v-model="usuario.cep" class="form-control" disabled />
              </div>
            </div>
          </div>
        </form>

        <div class="rev-produto">
          <h2 class="p-3">Produtos:</h2>
          <div class="lista-produtos">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Qtd</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Preço Un.</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="produto in listaCarrinho" :key="produto.id">
                  <td>{{ produto.quantidade }}</td>
                  <td>{{ produto.nome }}</td>
                  <td>{{ produto.marca }}</td>
                  <td>{{ formatarMoeda(produto.precoVenda) }}</td>
                  <td @click="removerDoCarrinho(produto.id)">
                    <i class="fa-solid fa-trash lixeira" style="color: red"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="resumo-compra">
          <h2>Resumo do pedido:</h2>
          <div class="itens-resumo">
            <p v-for="item in listaCarrinho" :key="item.id">
              {{ item.nome }} = {{ formatarMoeda(item.precoVenda * item.quantidade) }}
            </p>
          </div>
          <hr />
          <h2>Total: {{ formatarMoeda(totalCarrinho) }}</h2>
          <p>Deseja finalizar o pedido?</p>
          <div class="btn-finalizar-div">
            <button class="btn btn-success" @click="registrarPedido">Registrar Pedido</button>
            <RouterLink to="/carrinho" class="btn btn-primary">Voltar para o carrinho</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-revisao {
  background: #f4f8fb;
  min-height: 90vh;

  padding: 30px 15px;
  display: flex;
  justify-content: center;
}


.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.spinner {
  width: 45px;
  height: 45px;
  border: 5px solid #dcecf3;
  border-top-color: #005373;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


.rev-background {
  width: 100%;
  max-width: 1400px;
}

.h1-rev {
  background: #005373;
  color: #fff;
  text-align: center;
  padding: 18px;
  border-radius: 14px;
}

.rev-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  margin-top: 20px;
}

.rev-grid>div,
.form {
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 83, 115, 0.08);
  border: 1px solid #dcecf3;
}

.rev-grid h2 {
  background: #005373;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
}

.resumo-compra {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.btn-finalizar-div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button,
.btn {
  border-radius: 12px !important;
  font-weight: 600;
  padding: 12px;
}

.btn-success {
  background: #006e1d !important;
  border: none !important;
}

.btn-primary {
  background: #005373 !important;
  border: none !important;
}

@media (max-width: 992px) {
  .rev-grid {
    grid-template-columns: 1fr;
  }

  .resumo-compra {
    position: static;
  }
}
</style>
