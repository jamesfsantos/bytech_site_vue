<script setup lang="ts">
import produtoService from "@/services/produtoService";
import { type ProdutoModel } from "@/models/produtoModel";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { formatarMoeda } from "@/utils/utils";

const route = useRoute();
const temCategoria = ref(false);

const categorias: Record<string, number> = {
  "video-games": 1,
  "computadores": 2,
};

const categoriaId = computed(() => {
  if (route.params) {
    const catId = route.params.categoriaId as string;
    if (catId) return categorias[catId];
  }
  return 0;
});

const produtos = ref<ProdutoModel[]>([]);

const produtosExibidos = computed(() => {
  return produtos.value.filter(p => p.ativo === true);
});

const carregando = ref(true);

async function buscarProdutos() {
  temCategoria.value = categoriaId.value! > 0;
  console.log("1. Categoria ID:", categoriaId.value); // VEJA SE É 1 OU 2

  if (temCategoria.value) {
    carregando.value = true;
    try {
      const dados = await produtoService.buscarPorCategoria(categoriaId.value);
      console.log("2. Dados brutos da API:", dados); // VEJA SE VEM UM ARRAY []

      produtos.value = dados;

      console.log("3. Produtos Ativos filtrados:", produtosExibidos.value); // VEJA SE TEM ITENS AQUI
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      carregando.value = false;
    }
  }
}




watch(
  () => route.params.categoriaId,
  async () => {
    await buscarProdutos();
  },
  { immediate: true },
);
</script>

<template>
  <div class="catalogo">
    <div v-if="temCategoria">

      <div v-if="carregando" class="text-center w-100 mt-5">
        <h3 class="text-white">Buscando produtos...</h3>
      </div>

      <div v-else-if="produtosExibidos.length > 0" class="card-produto">
        <div class="detalhes-produto" v-for="produto in produtosExibidos" :key="produto.id">
          <h2>{{ produto.nome }}</h2>
          <img class="imagem" :src="produto.imagem" />
          <p class="descricao">{{ produto.descricao }}</p>
          <div class="compra">
            <span class="preco">{{ formatarMoeda(produto.precoVenda) }}</span>
            <RouterLink :to="`/produto/${produto.id}`">
              <button class="botao">Detalhes</button>
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-else class="text-center w-100 mt-5">
        <h3 class="text-white">Ops! Nenhum produto disponível nesta categoria no momento.</h3>
      </div>

    </div>

    <div v-else>
      <h2 class="ErroMensagem">Categoria não localizada</h2>
    </div>
  </div>
</template>
<style scoped>
.ErroMensagem {
  color: white;
}

.catalogo {
  width: 95vw;
  height: auto;
}



/*.card-produto {
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  margin: 0 auto;
}
*/

.card-produto {
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
}

.detalhes-produto {
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  transition: all 0.3s ease;
  max-width: 400px;

  width: 100%;
  margin: 0 auto;

}

.detalhes-produto:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-10px);
}

.detalhes-produto img,
span,
p {
  text-align: center;
}

.imagem {
  width: 100%;
  height: 250px;
  text-align: center;
  align-items: center;
  object-fit: contain;
  /* ou cover se quiser cortar */
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
  color: white;
  border: 0px;
}

.botao a {
  text-decoration: none;
  color: #fff;
}

.botao:hover {
  cursor: pointer;
  background-color: rgba(58, 214, 58, 0.562);
}

@media (max-width: 1200px) {
  .card-produto {
    grid-template-columns: repeat(3, minmax(250px, 1fr));
  }
}

@media (max-width: 900px) {
  .card-produto {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
}

@media (max-width: 600px) {
  .card-produto {
    grid-template-columns: 1fr;
  }

}
</style>
