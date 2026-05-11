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

const produtosExibidos = computed(() => {
  return produtos.value.filter((p) => p.ativo === true);
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
  <main class="catalogo">
    <div v-if="temCategoria">
      <!-- LOADING -->
      <div v-if="carregando" class="estado">
        <h2>Buscando produtos...</h2>
      </div>

      <!-- PRODUTOS -->
      <section v-else-if="produtosExibidos.length > 0" class="grid-produtos">
        <article class="produto-card" v-for="produto in produtosExibidos" :key="produto.id">
          <RouterLink class="card-link" :to="`/produto/${produto.id}`">
            <!-- IMAGEM -->
            <div class="imagem-area">
              <img class="imagem" :src="produto.imagem" :alt="produto.nome" />
            </div>

            <!-- CONTEÚDO -->
            <div class="conteudo">
              <h2 class="titulo">
                {{ produto.nome }}
              </h2>

              <p class="descricao">
                {{ produto.descricao }}
              </p>

              <div class="rodape">
                <span class="preco">
                  {{ formatarMoeda(produto.precoVenda) }}
                </span>

                <button class="botao">Ver detalhes</button>
              </div>
            </div>
          </RouterLink>
        </article>
      </section>

      <!-- SEM PRODUTOS -->
      <div v-else class="estado">
        <h2>Nenhum produto disponível nesta categoria.</h2>
      </div>
    </div>

    <!-- ERRO -->
    <div v-else class="estado">
      <h2>Categoria não localizada.</h2>
    </div>
  </main>
</template>

<style scoped>

.catalogo {
  min-height: 100vh;

  background: #f4f7fa;

  padding: 40px;
}


.grid-produtos {
  width: 100%;

  max-width: 1800px;

  margin: auto;

  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  gap: 28px;
}


.produto-card {
  background: #ffffff;

  border-radius: 24px;

  overflow: hidden;

  transition: 0.25s ease;

  border: 1px solid #d9e2ec;
}

.produto-card:hover {
  transform: translateY(-6px);

  border-color: #00537330;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.card-link {
  text-decoration: none;
  color: inherit;
}


.imagem-area {
  width: 100%;
  height: 300px;

  background: #eef3f7;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;
}

.imagem {
  width: 100%;
  height: 100%;

  object-fit: contain;

  transition: 0.3s;
}

.produto-card:hover .imagem {
  transform: scale(1.04);
}


.conteudo {
  padding: 24px;

  display: flex;
  flex-direction: column;

  gap: 20px;
}

.titulo {
  color: #1f2937;

  font-size: 1.15rem;

  line-height: 1.4;

  min-height: 55px;
}



.descricao {
  color: #6b7280;

  font-size: 0.95rem;

  line-height: 1.6;

  display: -webkit-box;

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;

  overflow: hidden;

  min-height: 72px;
}



.rodape {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 15px;

  margin-top: auto;
}

.preco {
  color: #00a86b;

  font-size: 1.5rem;

  font-weight: bold;
}

.botao {
  height: 45px;

  border: none;

  border-radius: 12px;

  padding: 0 18px;

  background: #005373;

  color: white;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

.botao:hover {
  background: #00698f;
}


.estado {
  min-height: 70vh;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  color: #1f2937;
}



@media (max-width: 768px) {
  .catalogo {
    padding: 20px;
  }

  .grid-produtos {
    grid-template-columns: 1fr;

    gap: 20px;
  }

  .imagem-area {
    height: 250px;
  }

  .titulo {
    font-size: 1rem;
  }

  .preco {
    font-size: 1.3rem;
  }

  .rodape {
    flex-direction: column;
    align-items: stretch;
  }

  .botao {
    width: 100%;
  }
}
</style>
