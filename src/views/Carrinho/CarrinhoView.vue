<script setup lang="ts">
import router from "@/router";
import { listaCarrinho, removerDoCarrinho, limparCarrinho } from "@/stores/carrinhoStores";
import { computed } from "vue";

const totalCompra = computed(() => {
  return listaCarrinho.value.reduce((soma, produto) => {
    return soma + produto.precoVenda * produto.quantidade;
  }, 0);
});

const irParaRevisao = () => {
  router.push("/revisao-pagamento");
};
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
                <option v-for="n in Math.min(produto.estoqueAtual, 5)" :key="n" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>

            <p class="preco">Unitário: R$ {{ produto.precoVenda.toFixed(2) }}</p>
            <p class="subtotal">
              Subtotal: R$ {{ (produto.precoVenda * produto.quantidade).toFixed(2) }}
            </p>
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
main {
  min-height: 100vh;

  background: #f4f7fa;

  padding: 40px 20px;

  display: flex;
  justify-content: center;
}

.Carrinho {
  width: 100%;
  max-width: 1400px;

  display: flex;
  flex-direction: column;

  gap: 25px;
}

.Carrinho h1 {
  color: #1f2937;

  font-size: 2.5rem;

  font-weight: bold;
}

.item {
  color: #6b7280;

  font-size: 1rem;
}

.Carrinho h2 {
  color: #1f2937;

  font-size: 1.8rem;

  margin-top: 20px;
}

.Resumo {
  background: white;

  border-radius: 22px;

  border: 1px solid #d9e2ec;

  padding: 25px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  transition: 0.2s ease;
}

.Resumo:hover {
  transform: translateY(-3px);

  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
}

.produto-selecionado {
  display: flex;
  flex-direction: column;

  gap: 20px;
}

.produto-selecionado > p {
  font-size: 1.2rem;

  font-weight: 600;

  color: #1f2937;
}

.produto-selecionado span {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 25px;

  flex-wrap: wrap;
}

.imagem-miniatura {
  width: 90px !important;
  height: 90px !important;

  object-fit: contain;

  border-radius: 16px;

  background: #eef3f7;

  padding: 10px;

  border: 1px solid #d9e2ec;
}

.controles {
  display: flex;
  align-items: center;

  gap: 10px;
}

.controles label {
  font-weight: 600;

  color: #374151;
}

.controles select {
  height: 40px;

  border-radius: 10px;

  border: 1px solid #d1d5db;

  padding: 0 10px;

  background: white;

  color: #1f2937;

  outline: none;
}

.preco,
.subtotal {
  color: #374151;

  font-weight: 600;

  margin: 0;
}

.subtotal {
  color: #00a86b;

  font-size: 1.1rem;
}

.btn-Remover-Carrinho {
  width: 38px !important;
  height: 38px !important;

  border-radius: 10px;

  border: 1px solid #dc2626;

  background: white;

  color: #dc2626;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

.btn-Remover-Carrinho:hover {
  background: #dc2626;

  color: white;
}

.Limpar-Carrinho {
  display: flex;
  justify-content: flex-end;
}

.Limpar-Carrinho .btn {
  border-radius: 12px;

  padding: 12px 20px;

  font-weight: 600;
}

.Total {
  background: white;

  border-radius: 22px;

  border: 1px solid #d9e2ec;

  padding: 35px;

  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 20px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.Valor-Total-Compra {
  font-size: 2rem;

  font-weight: bold;

  color: #1f2937;
}

.btnfinalizar {
  width: 250px;

  height: 55px;

  border: none;

  border-radius: 14px;

  background: #005373;

  color: white;

  font-size: 1rem;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

.btnfinalizar:hover {
  background: #00698f;

  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .produto-selecionado span {
    flex-direction: column;

    align-items: flex-start;
  }

  .Resumo {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  main {
    padding: 20px 10px;
  }

  .Carrinho h1 {
    font-size: 2rem;
  }

  .Valor-Total-Compra {
    font-size: 1.6rem;
  }

  .btnfinalizar {
    width: 100%;
  }
}
</style>
