<script lang="ts" setup>
import produtoService from "@/services/produtoService";
import { type ProdutoModel } from "@/models/produtoModel";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const temCategoria = ref(false);

const categorias: Record<string, number> = {
  "video-games": 1,
  computadores: 2,
};

const categoriaId = computed(() => {
  if (route.params) {
    const catId = route.params.categoriaId as string;
    if (catId) return categorias[catId];
  }
  return 0;
});

const produtos = ref<ProdutoModel[]>([]);

async function buscarProdutos() {
  temCategoria.value = categoriaId.value! > 0;

  if (temCategoria.value)
    produtos.value = await produtoService.buscarPorCategoria(categoriaId.value!);
}

watch(
  () => route.params.categoriaId,
  async () => {
    temCategoria.value = categoriaId.value! > 0;
    await buscarProdutos();
  },
  { immediate: true },
);

</script>

<template>
  <main>
    <div class="catalogo">
      <div class="card-produto" v-if="temCategoria">
        <div class="detalhes-produto" v-for="produto in produtos" :key="produto.id">
          <h2>{{ produto.nome }}</h2>
          <img class="imagem" :src="produto.imagem" />
          <p class="descricao">{{ produto.descricao }}</p>
          <div class="compra">
            <div>
              <span class="preco">R$ {{ produto.precoVenda }}</span>
            </div>
            <div class="botao">
              <a class="produtoSelecionado" href="">Detalhes</a>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h2>Categoria não localizada</h2>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
}

.catalogo {
  width: 95vw;
  height: auto;
}

.card-produto {
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detalhes-produto {
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  transition: all 0.3s ease;
}

.detalhes-produto:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-10px);
}

.detalhes-produto img,
span,
p {
  text-align: left;
}

.imagem {
  width: 300px;
  height: 250px;
  text-align: center;
}

.descricao {
  /* border:  1px solid black; */
  padding: 10px;
}

.compra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}

.preco {
  font-size: 20px;
  font-weight: bold;
}

.botao {
  background-color: rgb(58, 214, 58);
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
}

.botao a {
  text-decoration: none;
  color: #fff;
}

.botao:hover {
  cursor: pointer;
  background-color: rgba(58, 214, 58, 0.562);
}
</style>
