<script setup lang="ts">
import { useRouter } from "vue-router";
import usuarioService from "@/services/usuarioService";
import { computed, onMounted, ref, watch } from "vue";
import { limparCarrinho, listaCarrinho, removerDoCarrinho } from "@/stores/carrinhoStores";
import type { PedidoModel } from "@/models/pedidoModel";
import { formatarMoeda } from "@/utils/utils";
import pedidoService from "@/services/pedidoService";
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";
import viaCepService from "@/services/viaCepService";

const { estaLogado } = useAuth();
const router = useRouter();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const usuario = ref<any>(null); // Inicializado como null
const carregando = ref(true);
const buscandoCep = ref(false); // Spinner específico para o CEP
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

async function buscarEndereco(cep: string) {
  buscandoCep.value = true;
  try {
    const res = await viaCepService.buscarPorCEP(cep);
    if (res && !res.erro) {
      usuario.value.endereco = `${res.logradouro}${res.bairro ? ', ' + res.bairro : ''}`;
      usuario.value.cidade = res.localidade || "";
      if (res.complemento) usuario.value.complemento = res.complemento;
    } else {
      Swal.fire("CEP", "CEP não encontrado. Verifique os números.", "info");
    }
  } catch (error) {
    console.error("Erro viaCEP:", error);
  } finally {
    buscandoCep.value = false;
  }
}

// Watch corrigido para verificar se usuario existe antes de acessar .cep
watch(
  () => usuario.value?.cep,
  (novoValor) => {
    if (!novoValor) return;

    let v = novoValor.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);

    if (v.length === 8) {
      buscarEndereco(v);
    }

    // Aplica a máscara 00000-000
    if (v.length > 5) {
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
    }
    usuario.value.cep = v;
  }
);

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
      });
      limparCarrinho();
      router.push("/pedidos");
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
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
      <p>Carregando dados do pedido...</p>
    </div>

    <div class="rev-background" v-else-if="usuario">
      <h1 class="h1-rev">Revisão do Pedido</h1>

      <div class="rev-grid">
        <form class="form" @submit.prevent>
          <div class="inf-nf">
            <h2>Informações na nota fiscal:</h2>
            <div class="row g-3">
              <div class="col-md-8">
                <label>Nome:</label>
                <input type="text" class="form-control" v-model="usuario.nome" disabled />
              </div>
              <div class="col-md-4">
                <label>CPF:</label>
                <input type="text" class="form-control" v-model="usuario.cpf" disabled />
              </div>
              <div class="col-md-6">
                <label>Email:</label>
                <input type="email" v-model="usuario.email" class="form-control" disabled />
              </div>
              <div class="col-md-6">
                <label>Celular:</label>
                <input type="text" v-model="usuario.celular" class="form-control" disabled />
              </div>
            </div>
          </div>

          <div class="end-envio mt-4">
            <h2>Endereço de Entrega:</h2>
            <div class="row g-3">
              <div class="col-md-4">
                <label>CEP:</label>
                <div class="d-flex align-items-center">
                  <input type="text" maxlength="9" v-model="usuario.cep" class="form-control" placeholder="00000-000" />
                  <div v-if="buscandoCep" class="spinner-border spinner-border-sm ms-2 text-primary"></div>
                </div>
              </div>
              <div class="col-md-8">
                <label>Cidade:</label>
                <input type="text" v-model="usuario.cidade" class="form-control" />
              </div>
              <div class="col-md-12">
                <label>Logradouro/Bairro:</label>
                <input type="text" v-model="usuario.endereco" class="form-control" />
              </div>
              <div class="col-md-12">
                <label>Complemento/Número:</label>
                <input type="text" v-model="usuario.complemento" class="form-control" />
              </div>
            </div>
          </div>
        </form>

        <div class="rev-produto">
          <h2 class="p-3">Produtos no Carrinho:</h2>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Qtd</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="produto in listaCarrinho" :key="produto.id">
                  <td>{{ produto.quantidade }}x</td>
                  <td>{{ produto.nome }}</td>
                  <td>{{ formatarMoeda(produto.precoVenda) }}</td>
                  <td>{{ formatarMoeda(produto.precoVenda * produto.quantidade) }}</td>
                  <td>
                    <i class="fa-solid fa-trash lixeira" @click="removerDoCarrinho(produto.id)"
                      style="color: red; cursor: pointer;"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="resumo-compra">
          <h2>Resumo Financeiro</h2>
          <div class="itens-resumo">
            <div v-for="item in listaCarrinho" :key="item.id" class="d-flex justify-content-between mb-1">
              <span>{{ item.nome }} ({{ item.quantidade }}x)</span>
              <span>{{ formatarMoeda(item.precoVenda * item.quantidade) }}</span>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <h3>Total:</h3>
            <h3 class="text-success">{{ formatarMoeda(totalCarrinho) }}</h3>
          </div>
          <div class="btn-finalizar-div mt-3">
            <button class="btn btn-success w-100 mb-2" @click="registrarPedido">Finalizar Compra</button>
            <RouterLink to="/carrinho" class="btn btn-outline-primary w-100">Voltar ao Carrinho</RouterLink>
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
  font-size: 1.8rem;
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
  margin-bottom: 20px;
}

.resumo-compra {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.lixeira:hover {
  transform: scale(1.2);
  transition: 0.2s;
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
