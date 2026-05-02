<script setup lang="ts">
import produtoService from "@/services/produtoService";
import { type ProdutoModel } from "@/models/produtoModel";
import { adicionarAoCarrinho } from '@/stores/carrinhoStores'
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const handleAdicionarCarrinho = () => {
  if (produto.value) {
    adicionarAoCarrinho(produto.value)
    router.push("/carrinho");
  }
}

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
  if (temProduto.value)
    produto.value = await produtoService.buscarProdutoPorId(produtoId.value);
}



watch(() =>
  route.params.produtoId,
  async () => {
    await buscarProduto()
  },
  { immediate: true }
);

</script>

<template>
  <main v-if="produto">

    <div class="vitrine">
      <div class="imagens-produto">
        <img class="imagem-principal" :src="`${produto.imagem}`" alt="" />

        <div class="img-miniaturas">
          <img class="miniatura-1" src="@/assets/images/ps5pro.jpg" alt="" />
          <img class="miniatura-2" src="@/assets/images/ps5pro.jpg" alt="" />
          <img class="miniatura-3" src="@/assets/images/ps5pro.jpg" alt="" />
        </div>
      </div>

      <div class="descricao-produto">
        <h2 class="titulo-produto">{{ produto.nome }}</h2>

        <ul class="Lista-Descricao">
          <li>Marca: Sony</li>
          <li>Modelo: CFI-ZCT1W12X</li>
          <li>Resolução: 1440p nativo - 4K</li>
          <li>Ray Tracing: Sim</li>
          <li>FPS: Até 120fps</li>
          <li>Taxa de atualização: 120Hz</li>
          <li>HDR: Sim</li>
          <li>Áudio: Tempest 3D AudioTech2</li>
          <li>Armazenamento: 2TB SSD</li>
          <li>Retrocompatibilidade: Sim, PS4</li>
          <li>WI-FI: IEEE 802.11be WI-FI 6</li>
          <li>Jogos Inclusos: Astro’s Playroom</li>
        </ul>
      </div>

      <div class="descricao-compra">
        <p class="preco">
          <br>
          Preço R$ 5999,00 a vista
          <br />
          ou até 12x de R$ 599 sem juros
        </p>

        <div class="botoes">

          <button class="btn-add-carrinho" @click="handleAdicionarCarrinho">Adicionar ao carrinho</button>

        </div>

        <div class="frete">
          <h3>Entrega</h3>
          <form>
            <input type="text" id="CEP" name="CEP" placeholder="Insira seu CEP" class="input-cep" /><br />
          </form>
          <button class="btn-frete">Calcular frete</button>
        </div>
      </div>
    </div>

    <div class="detalhes-produto">
      <br />
      <h2>Console Playstation 5 Pro Sony</h2>

      <p>
        Com o console ps5 pro, os maiores desenvolvedores de jogos do mundo podem aprimorar suas
        criações com recursos incríveis, como ray tracing avançado, definição de imagem super nítida
        para tvs 4k e jogabilidade com alta taxa de fps. Com o poder do ps5 pro, os jogos
        compatíveis podem ser jogados em até 120fps, com ray tracing e resolução 4k aprimorada por
        ia usando pssr, tudo ao mesmo tempo, na sua tv.
        <br />
        2 tb de armazenamento Tenha seus jogos favoritos prontos e esperando para você começar a
        jogar com 2 tb de armazenamento ssd integrado.
        <br />
        Conectividade sem fio online de alto nível O ps5 pro oferece suporte a recursos aprimorados
        de internet sem fio com mais largura de banda utilizável para aumentar as velocidades de
        transferência com ieee 802.11be e seu roteador compatível, o que significa que você pode ter
        a experiência de latência reduzida e maior estabilidade ao jogar online.
        <br />
        Ps5 promelhoria do desempenho dos jogos e compatibilidade retroativa O console ps5 pro pode
        reproduzir mais de 8.500 jogos do ps4. Com o recurso game boost do ps5 pro, você pode
        aproveitar as taxas de quadros mais rápidas e suaves em alguns dos melhores jogos do console
        ps4 e ps5!
        <br />
        Informações Técnicas Características: - Marca: Sony - Modelo: CFI-ZCT1W12X
        <br />
        Especificações Técnicas:
        <br />
        - Resolução: 1440p nativo - 4K - Ray Tracing: Sim - FPS: Até 120fps - Taxa de atualização:
        120Hz - HDR: Sim - Áudio: Tempest 3D AudioTech2 - Armazenamento: 2TB SSD -
        Retrocompatibilidade: Sim, PS4 - WI-FI: IEEE 802.11be WI-FI 6 - Jogos Inclusos: Astro’s
        Playroom
        <br />
        Conteúdo da Embalagem: - Console Playstation 5 Pro Sony
        <br />
        <br />
        Garantia do Fornecedor
        <br />
        3 Meses
        <br />
        <br />
        <br />
        Itens Inclusos
        <br />
        1 Console Sony Playstation 5 Pro, SSD 2TB, 1 Controle, Branco, 1000046552
        <br />
        <br />
        <br />
        Fabricante
        <br />
        Sony
        <br />
        <br />
        <br />
        Modelo
        <br />
        CFI-ZCT1W12X
        <br />
        <br />
        <br />
        Peso: 5077 gramas (bruto com embalagem)
        <br />
        Código Anatel: 140122113875
      </p>
    </div>

    <div class="contato">
      <div class="contatoArea">
        <h2>Canais de atendimento</h2>
        <a href=""><i class="fa-brands fa-whatsapp"></i>(11) 99999-9999</a>
        <a href=""><i class="fa-solid fa-phone-volume"></i>(11) 3999-9999</a>
        <a href=""><i class="fa-solid fa-envelope"></i>Bytech.Senac@Email.com.br</a>
        <a href=""><i class="fa-regular fa-comments"></i>Chatbot</a>
      </div>
    </div>
  </main>
  <div v-else>
    <h1>Produto não existe!</h1>
  </div>
</template>

<style scoped>
.vitrine {
    background-color: #353535;
    display: flex;
    /* grid-template-columns: 1fr 2fr 1fr; */
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    display: flex;
    gap: 40px;
    padding: 40px 40px;
    /* max-width: fit-content; */
    width: 100%;
    margin: 10px auto;
    justify-items: center;
    grid-auto-flow: row;

}


.imagens-produto {
  display: flex;
  width: auto;
  height: auto;
  gap: 20px;
  object-fit: cover;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: nowrap;
}

.imagem-principal {
  display: flex;
  flex-shrink: 1;
  max-width: 100%;
  max-height: 600px;
  width: 600px;
  height: auto;
}

.img-miniaturas {
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  max-width: 100px;
  max-height: 100px;
  gap: 20px;
  align-content: flex-start;
  justify-content: center;
  align-items: stretch;
}

.miniatura-1:hover {
  cursor: pointer;
  border: 2px solid #3b8cbe;
}

.miniatura-2:hover {
  cursor: pointer;
  border: 2px solid #3b8cbe;
}

.miniatura-3:hover {
  cursor: pointer;
  border: 2px solid #3b8cbe;
}

.descricao-produto {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-transform: uppercase;
  gap: 20px;
}

.descricao-produto p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.descricao-compra {
  background-color: #005373;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  max-width: 450px;
  max-height: 350px;
  flex-wrap: nowrap;
  border-radius: 5px;
}

.titulo-produto {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-transform: uppercase;
  text-align: center;
  width: 80%;
}

.botoes {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.botoes a {
  color: #3b8cbe;
  text-decoration: none;
}

.btn-compra,
.btn-formas-pagamento,
.btn-add-carrinho,
.btn-frete {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: auto; */
  background-color: #3b8cbe;
  border: none;
  border-radius: 10px;
  height: 42px;
  width: auto;
  color: white;
  font-weight: bold;
  cursor: pointer;
  /* margin-top: 20px; */
  min-height: 42px;
  padding: 0px 5px;
}

button:hover {
  background-color: #4ed0fc;
  border: 1px solid #78c8f7;
}

.btn-compra {
  background-color: #006e1d;
  height: 40px;
  width: 150px;
}

.input-cep {
  border: 0;
  border-radius: 5px;
  align-items: center;
  text-align: center;
  height: 40px;
}

.preco {
  padding: 50px 0px;
  text-align: center;
  font-size: 1.5rem;
  color: white;
}

.frete {
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 20px 0px;
  border-radius: 0px 0px 5px 5px;
}

.btn-frete {
  width: 120px;
}

.detalhes-produto {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  font-size: 16px;
}

.detalhes-produto p {
  padding: 50px 200px;
}

.contato {
  position: relative;
  background-color: lightgray;
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  border-radius: 0px;
  width: 100%;
  height: auto;
  margin: auto;
  margin-bottom: 50px;
  margin-top: 20px;
}

.contato i {
  font-size: 50px;
  margin-top: 20px;
  padding-bottom: 20px;
  color: #3b8cbe;
}

.Lista-Descricao {
  color: rgb(46, 46, 46);
  text-align: center;
  font-size: large;
  /* display: flex; */
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.contatoArea {
  flex-direction: row;
}

.contatoArea a {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: #3b8cbe;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1800px) {
  .vitrine {
    flex-wrap: wrap;
  }
}

@media (max-width: 1400px) {
  .vitrine {
    flex-wrap: wrap;
  }
}

@media (max-width: 1250px) {
  .vitrine {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-items: center;
    align-items: center;
    margin: 40px auto;
  }

  .imagens-produto {
    flex-direction: column;
  }

  .img-miniaturas {
    flex-direction: row;
  }

}

@media (max-width: 900px) {
  .vitrine {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 40px auto;
  }

  /* div.imagen-produto {
        width: 100%;
        height: auto;
    } */

  .imagens {
    width: 100%;
    height: auto;
  }

  .detalhes-produto p {
    padding: 0 0;
  }

  /* .vitrine {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
    }

    .descricao-produto {
        font-size: 1rem;
    }

    .detalhes-produto p {
        padding: 20px;
    } */
}

@media (max-width: 768px) {
  .detalhes-produto {
    padding: 50px;
    gap: 20px;
  }

  .detalhes-produto h2 {
    text-align: center;
  }

  .botoes {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .frete {
    flex-direction: column;
  }

  .descricao-compra {
    width: 100%;
    height: auto;
    max-height: 100%;
  }

  .imagens-produto {
    flex-direction: column;
  }

  .img-miniaturas {
    flex-direction: row;
  }
}
</style>
