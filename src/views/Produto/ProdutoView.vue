<script setup lang="ts">
import produtoService from "@/services/produtoService";
import { type ProdutoModel } from "@/models/produtoModel";
import { adicionarAoCarrinho } from "@/stores/carrinhoStores";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatarMoeda } from "@/utils/utils";

const router = useRouter();

const handleAdicionarCarrinho = () => {
  if (produto.value) {
    adicionarAoCarrinho(produto.value);
    router.push("/carrinho");
  }
};

const route = useRoute();
const temProduto = ref(false);

const produtoId = computed(() => {
  if (route.params) {
    const pId: number = Number(route.params.produtoId as string);
    if (pId) return pId;
  }
  return 0;
});

const produto = ref<ProdutoModel>();

async function buscarProduto() {
  temProduto.value = produtoId.value > 0;
  if (temProduto.value) produto.value = await produtoService.buscarProdutoPorId(produtoId.value);
}

watch(
  () => route.params.produtoId,
  async () => {
    await buscarProduto();
  },
  { immediate: true },
);
</script>

<template>
  <main v-if="produto" class="pagina-produto">
    <!-- CONTAINER -->
    <section class="produto-container">
      <!-- GALERIA -->
      <div class="galeria">
        <div class="miniaturas">
          <img :src="produto.imagem" alt="" />
          <img :src="produto.imagem" alt="" />
          <img :src="produto.imagem" alt="" />
        </div>

        <div class="imagem-area">
          <img class="imagem-principal" :src="produto.imagem" alt="" />
        </div>
      </div>

      <!-- INFORMAÇÕES -->
      <div class="informacoes">
        <span class="marca">
          {{ produto.marca }}
        </span>

        <h1 class="titulo">
          {{ produto.nome }}
        </h1>

        <div class="linha"></div>

        <ul class="specs">
          <li>Produto original</li>
          <li>Garantia de 12 meses</li>
          <li>Entrega rápida</li>
          <li>Pagamento seguro</li>
        </ul>

        <div class="descricao">
          <h3>Descrição</h3>

          <p>
            {{ produto.descricao }}
          </p>
        </div>
      </div>

      <!-- COMPRA -->
      <aside class="compra-card">
        <div class="preco-area">
          <span class="pix-label"> À vista no PIX </span>

          <h2 class="preco">
            {{ formatarMoeda(produto.precoVenda) }}
          </h2>

          <p class="parcelamento">
            ou em até
            <strong>
              12x de
              {{ formatarMoeda(produto.precoVenda / 12) }}
            </strong>
            sem juros
          </p>
        </div>

        <button class="btn-carrinho" @click="handleAdicionarCarrinho">Adicionar ao carrinho</button>

        <div class="frete">
          <h3>Calcular frete</h3>

          <input type="text" placeholder="Digite seu CEP" class="input-cep" />

          <button class="btn-frete">Calcular</button>
        </div>
      </aside>
    </section>
  </main>

  <main v-else class="produto-nao-encontrado">
    <h1>Produto não encontrado.</h1>
  </main>
</template>

<style scoped>
.pagina-produto {
  min-height: 100vh;

  background: #f4f7fa;

  padding: 40px;

  color: #1f2937;
}

.produto-container {
  max-width: 1700px;
  margin: auto;

  display: grid;
  grid-template-columns: 1.1fr 1fr 420px;

  gap: 40px;
  align-items: start;
}



.galeria {
  display: flex;
  gap: 20px;
}

.miniaturas {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.miniaturas img {
  width: 90px;
  height: 90px;

  object-fit: cover;

  border-radius: 12px;

  background: white;

  padding: 5px;

  cursor: pointer;

  border: 1px solid #d9e2ec;

  transition: 0.2s;
}

.miniaturas img:hover {
  border-color: #005373;

  transform: translateY(-2px);
}

.imagem-area {
  flex: 1;

  background: white;

  border-radius: 24px;

  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d9e2ec;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.imagem-principal {
  width: 100%;
  max-width: 650px;

  object-fit: contain;

  transition: 0.3s;
}

.imagem-principal:hover {
  transform: scale(1.02);
}



.informacoes {
  background: white;

  border-radius: 24px;

  padding: 35px;

  display: flex;
  flex-direction: column;
  gap: 25px;

  border: 1px solid #d9e2ec;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.marca {
  width: fit-content;

  background: #eef6fa;

  color: #005373;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 0.9rem;

  font-weight: bold;
}

.titulo {
  font-size: 2.2rem;

  line-height: 1.2;

  color: #1f2937;
}

.linha {
  width: 100%;

  height: 1px;

  background: #e5e7eb;
}

.specs {
  display: flex;
  flex-direction: column;

  gap: 14px;

  list-style: none;

  padding: 0;
}

.specs li {
  background: #f8fafc;

  padding: 14px;

  border-radius: 12px;

  color: #4b5563;

  border: 1px solid #e5e7eb;
}

.descricao {
  display: flex;
  flex-direction: column;

  gap: 15px;
}

.descricao h3 {
  font-size: 1.2rem;

  color: #1f2937;
}

.descricao p {
  color: #6b7280;

  line-height: 1.7;
}


.compra-card {
  background: white;

  border-radius: 24px;

  overflow: hidden;

  position: sticky;
  top: 20px;

  border: 1px solid #d9e2ec;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.preco-area {
  padding: 35px;
}

.pix-label {
  color: #00a86b;

  font-size: 0.95rem;

  font-weight: bold;
}

.preco {
  margin-top: 10px;

  font-size: 2.6rem;

  color: #1f2937;
}

.parcelamento {
  margin-top: 15px;

  color: #6b7280;

  line-height: 1.5;
}

.btn-carrinho {
  width: calc(100% - 70px);

  margin: 0 35px;

  height: 56px;

  border: none;

  border-radius: 14px;

  background: #005373;

  color: white;

  font-size: 1rem;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

.btn-carrinho:hover {
  background: #00698f;

  transform: translateY(-2px);
}



.frete {
  margin-top: 35px;

  background: #f8fafc;

  padding: 35px;

  display: flex;
  flex-direction: column;

  gap: 15px;

  border-top: 1px solid #e5e7eb;
}

.frete h3 {
  font-size: 1rem;

  color: #1f2937;
}

.input-cep {
  height: 50px;

  border: 1px solid #d1d5db;

  border-radius: 12px;

  background: white;

  color: #1f2937;

  padding: 0 15px;

  outline: none;
}

.input-cep:focus {
  border-color: #005373;
}

.btn-frete {
  height: 50px;

  border: none;

  border-radius: 12px;

  background: #eef3f7;

  color: #005373;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

.btn-frete:hover {
  background: #dce7ee;
}


.produto-nao-encontrado {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f4f7fa;

  color: #1f2937;
}


@media (max-width: 1450px) {
  .produto-container {
    grid-template-columns: 1fr;
  }

  .compra-card {
    position: static;
  }
}

@media (max-width: 900px) {
  .pagina-produto {
    padding: 20px;
  }

  .galeria {
    flex-direction: column-reverse;
  }

  .miniaturas {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .titulo {
    font-size: 1.7rem;
  }

  .preco {
    font-size: 2rem;
  }
}
</style>
