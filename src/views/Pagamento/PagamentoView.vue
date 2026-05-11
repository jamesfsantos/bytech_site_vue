<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import pedidoService from '@/services/pedidoService';
import Swal from 'sweetalert2'; // Opcional, para uma mensagem bonita
import pagamentoService from '@/services/pagamentoService';
import { type PedidoModel } from '@/models/pedidoModel';
import { formatarMoeda } from '@/utils/utils';
import type { PagamentoModel } from '@/models/pagamentoModel';

const route = useRoute();
const router = useRouter();

const pedido = ref<PedidoModel>();


const pagamento = ref({
  idPedido: Number(route.params.id),
  metodo: "",
  status: "Pendente",
  dataConfirmacao: new Date()
});

const carregarPedido = async () => {
  try {
    const dados = await pedidoService.obterPedidoId(pagamento.value.idPedido);
    pedido.value = dados

  } catch (error) {
    console.error("Erro ao buscar pedido:", error)
  }
}


const realizarPagamento = async () => {
  try {

    const dados = pagamento.value;
    console.log("Iniciando pagamento para o pedido:", dados.idPedido);


    await pagamentoService.gerarPagamento(dados as PagamentoModel);


    await pedidoService.atualizarStatus(dados.idPedido, 2);


    await Swal.fire({
      title: 'Pagamento realizado com sucesso!',
      text: 'Obrigado por comprar na Bytech!',
      icon: 'success',
      confirmButtonText: 'Ir para Meus Pedidos'
    });


    router.push('/pedidos');

  } catch (error) {
    // Se qualquer uma das APIs der erro (ex: 400 ou 500), cai aqui
    console.error("Erro no checkout:", error);

    Swal.fire({
      title: 'Erro no Pagamento',
      text: 'Não conseguimos processar seu pagamento. Tente novamente.',
      icon: 'error'
    });
  }
};

onMounted(async () => {
  carregarPedido();
})
</script>

<template>
  <div class="container vh-80">

    <div class="mt-5">
      <h1>Valor: {{ formatarMoeda(pedido?.valorTotalPedido!!) }}</h1>
    </div>
    <div class="opcoes-metodos m-5">

      <div class="metodo-item" :class="{ 'ativo': pagamento.metodo === 'pix' }">
        <input type="radio" id="pix" value="pix" v-model="pagamento.metodo" />
        <label for="pix">PIX</label>
      </div>

      <div class="metodo-item" :class="{ 'ativo': pagamento.metodo === 'cartao' }">
        <input type="radio" id="cartao" value="cartao" v-model="pagamento.metodo" />
        <label for="cartao">Cartão de Crédito</label>
      </div>

    </div>

    <hr />

    <div v-if="pagamento.metodo === 'pix'" class="detalhes-pix m-5 d-flex flex-column align-items-center">
      <h3>Pagamento via PIX</h3>
      <div class="qrcode-placeholder">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Obrigado!" alt="QR Code" />
        <p class="mt-2">Chave: 123.456.789-00</p>
      </div>
      <button @click="realizarPagamento" class="btn-confirmar btn btn-success">Confirmar Pagamento PIX</button>
    </div>

    <div v-if="pagamento.metodo === 'cartao'" class="detalhes-cartao m-5">
      <h3>Dados do Cartão</h3>
      <div class="form-cartao d-flex flex-column">
        <input type="text" class="form-control mb-2" maxlength="16" placeholder="Número do Cartão">
        <input type="text" class="form-control mb-2" placeholder="Nome Impresso">
        <div class="row g-2">
          <div class="col-6"><input type="text" class="form-control" maxlength="7" placeholder="MM/AA"></div>
          <div class="col-6"><input type="text" class="form-control" maxlength="3" placeholder="CVV"></div>
        </div>
        <button @click="realizarPagamento" class="btn-confirmar btn btn-success mt-3">Finalizar Compra no Cartão</button>
      </div>
    </div>

    <div v-if="!pagamento.metodo" class="aviso m-5">
      <p>Por favor, selecione um método de pagamento acima.</p>
    </div>
  </div>

</template>

<style scoped>
.metodo-item {
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 10px;
}

/* Quando o v-model bater com o valor, essa classe é aplicada */
.metodo-item.ativo {
  border-color: #3b8cbe;
  background-color: #eef7ff;
}

.metodo-item label {
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
}

.detalhes-pix,
.detalhes-cartao {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  animation: fadeIn 0.5s;
  /* Um efeitinho de surgir suave */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
