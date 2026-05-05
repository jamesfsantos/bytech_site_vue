<script setup lang="ts">
import router from '@/router';
import { listaCarrinho, removerDoCarrinho, limparCarrinho } from '@/stores/carrinhoStores';
import { computed } from 'vue';

const totalCompra = computed(() => {
  return listaCarrinho.value.reduce((soma, produto) => {
    return soma + (produto.precoVenda * produto.quantidade);
  }, 0)
})




const irParaRevisao = () => {
  router.push("/revisao-pagamento");
}

</script>

<template>
  <main>
    <div class="Carrinho">
      <h1>Seu Carrinho</h1>
      <p class="item">Itens adicionados ao carrinho:</p>
      <div class="Resumo" v-for="produto in listaCarrinho" :key="produto.id">

        <div class="produto-selecionado">
          <p>{{ produto.nome }}</p>
          <span>
            <img class="imagem-miniatura" :src="produto.imagem" :alt="produto.nome" />

            <div class="controles">
              <label>Qtd:</label>
              <select v-model="produto.quantidade">
                <option v-for="n in produto.estoqueAtual" :key="n" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>

            <p class="preco">Unitário: R$ {{ produto.precoVenda.toFixed(2) }}</p>
            <p class="subtotal">Subtotal: R$ {{ (produto.precoVenda * produto.quantidade).toFixed(2) }}</p>
            <button class="btn-Remover-Carrinho" @click="removerDoCarrinho(produto.id)">X</button>
          </span>
        </div>
      </div>
      <p class="Limpar-Carrinho">
        <button class="btn btn-danger" @click="limparCarrinho">Limpar Carrinho</button>
      </p>

      <h2>Resumo do Pedido</h2>
      <div class="Total">
        <p class="Valor-Total-Compra">Total: R$ {{ totalCompra.toFixed(2) }}</p>

        <button class="btnfinalizar" @click="irParaRevisao">Ir para a revisão...</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
div.Carrinho {
  border: 1px solid #3b8cbe;
  /* border-bottom: 28px solid #3b8cbe; */
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 80%;
  padding: 0px 0px;
  flex-wrap: wrap;
  align-content: center;
}

div.Carrinho img {
  height: 60px;
  width: 60px;
  border: 1px solid gray;
}

div.Carrinho h1,
h2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #3b8cbe;
  width: 100%;
  color: #ececec;
}

.btnfinalizar,
button.btnFrete {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  min-height: 40px;
  background-color: #006e1d;
  height: 40px;
  width: 150px;
}

button.btnFrete {
  background-color: #3b8cbe;
}


button.btn-Remover-Carrinho {
  width: 16px;
  height: 16px;
  background-color: transparent;
  color: rgb(255, 0, 0);
  border: 1px solid rgb(255, 0, 0);
}

button.btn-Remover-Carrinho:hover {
  background-color: rgb(255, 0, 0);
  color: white;
}

.Limpar-Carrinho {
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.produto-selecionado span {
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-right: 20px;
  flex-wrap: nowrap;
  width: auto;
  align-content: center;
  border: 1px solid #3b8cbe;
}

div.Total {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0px;
  width: 80%;
}

.Valor-Total-Compra {
  font-size: 20px;
  font-weight: bold;
}

div.frete {
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0px;
}

.input-cep {
  border: 0;
  border-radius: 5px;
  align-items: center;
  text-align: center;
  height: 40px;
}

.imagem-miniatura {
  width: 30px;
  height: 30px;
}

@media (max-width: 900px) {
  div.frete {
    flex-direction: column;
  }
}
</style>
