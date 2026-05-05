<script setup lang="ts">
import { useRouter } from "vue-router";
import usuarioService from "@/services/usuarioService";
import { computed, onMounted, ref } from "vue";
import { limparCarrinho, listaCarrinho, removerDoCarrinho } from "@/stores/carrinhoStores";
import type { PedidoModel } from "@/models/pedidoModel";
import { formatarMoeda } from "@/utils/utils";
import pedidoService from "@/services/pedidoService";

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
      alert("Pedido cadastrado com êxito!");
      limparCarrinho();
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
          <p>Descontos:</p>
          <br />
          <p>Frete:</p>
          <br />
          <h2>Total: {{ formatarMoeda(totalCarrinho) }}</h2>
          <br />
          <p>Deseja finalizar o pedido ?</p>
          <br />
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
.lixeira:hover {
  cursor: pointer;
}
.main-revisao {
  background-color: #353535;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
  min-height: 100vh;
  /* padding: 20px; */
  justify-content: center;
  align-content: center;
}

.rev-background {
  background-color: lightgray;
  padding-bottom: 20px;
  width: 100%;
}

.h1-rev {
  background-color: #3b8cbe;
  color: rgb(255, 255, 255);
  width: 100%;
  text-align: center;
}

.rev-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  max-width: 90%;
  margin: auto;
}

.rev-grid h2 {
  background-color: #3b8cbe;
  color: rgb(255, 255, 255);
  width: 100%;
  text-align: center;
}

/* cards padrão */
.rev-grid > div {
  border: 1px solid #7e9aab;
  border-radius: 5px;
  background-color: lightgray;
  /* padding: 15px; */
  min-height: 90px;
  /* para garantir que os cards tenham uma altura mínima consistente */
}

/* TOPO - ocupa tudo */
.inf-nf {
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  display: flex;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  flex-wrap: nowrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
}

/* endereço (esquerda) */
.end-envio {
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: flex-start;
}

/* produtos ocupa esquerda inteira */
.rev-produto {
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}

/* forma pagamento esquerda */
.forma-pagamento {
  grid-column: 1 / 2;
}

/* botão finalizar esquerda */
.btn-finalizar-div {
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  max-width: 500px;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  gap: 10px;
}

/* SIDEBAR (igual Kabum) */
.resumo-compra {
  grid-column: 2 / 3;
  grid-row: 1 / 6;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}

.btn-finalizar-compra {
  width: 200px;
  background-color: #006e1d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-voltar-compra {
  width: 200px;
  background-color: #3b8cbe;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-finalizar-compra:hover {
  background-color: #96e4fd;
}

@media only screen and (max-width: 600px) {
  .rev-grid {
    grid-template-columns: 1fr;
  }

  .resumo-compra {
    grid-column: 1 / 2;
    grid-row: 6 / 7;
  }

  .btn-finalizar-div {
    grid-column: 1 / 2;
  }
}
</style>
