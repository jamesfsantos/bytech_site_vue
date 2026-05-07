<script setup lang="ts">
import type { CategoriaModel } from "@/models/categoriaModel";
import categoriaService from "@/services/categoriaService";
import produtoService from "@/services/produtoService";
import Swal from "sweetalert2";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Money3Component as Money } from 'v-money3'


const configMoeda = {
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  decimal: ',',
  precision: 2,
  masked: false
}

const categorias = ref<CategoriaModel[]>([]);
const formularioValido = ref(false);

const route = useRoute();
const router = useRouter();

const idProduto = computed(() => route.params.id);
const isEdicao = computed(() => !!idProduto.value);

const carregarCategorias = async () => {
  try {
    categorias.value = await categoriaService.ObterCategorias();
  } catch (erro: unknown) {
    console.error("Erro ao carregar categorias:", erro);
    Swal.fire("Erro", "Não foi possível carregar a lista de categorias", "error");
  }
};

const formularioConta = ref({
  nome: "",
  imagem: "",
  precoVenda: 0,
  estoqueAtual: 0,
  descricao: "",
  categoriaId: "" as string | number,
  ativo: false,
  marca: "",
});

const carregarProduto = async () => {
  if (isEdicao.value) {
    try {
      const produto = await produtoService.buscarProdutoPorId(Number(idProduto.value));
      if (produto) {
        formularioConta.value = { ...produto };

      }
    } catch (error) {
      console.error("Erro ao buscar produto", error);
      Swal.fire("Erro", "Não foi possível buscar o produto", "error");
    }
  }
};

const cadastrarProduto = async (event: Event) => {
  const form = event.target as HTMLFormElement;
  formularioValido.value = true;

  if (!form.checkValidity()) return;

  console.log("Iniciando cadastro de produto!");
  try {
    const dados = {
      ...formularioConta.value,
      categoriaId: Number(formularioConta.value.categoriaId),
    };

    let sucesso = false;

    if (isEdicao.value) {
      sucesso = await produtoService.atualizarProduto(Number(idProduto.value), dados);
    } else {
      sucesso = await produtoService.cadastrarProduto(dados);
    }

    if (sucesso) {
      const result = await Swal.fire({
        title: isEdicao.value ? "Atualizado com sucesso!" : "Cadastrado com sucesso!",
        icon: "success",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });

      console.log(result);

      if (result.isConfirmed) router.push("/manager/produto");
    }
  } catch (erro: unknown) {
    console.error(erro);
  }
};

onMounted(() => {
  carregarCategorias();
  carregarProduto();
});
</script>

<template>
  <div class="container">
    <h1>{{ isEdicao ? "Editar Produto" : "Cadastro de Produto" }}</h1>
    <section class="form">
      <form
        class="row g-3"
        :class="{ 'was-validated': formularioValido }"
        @submit.prevent="cadastrarProduto"
        novalidate
      >
        <div class="col-12">
          <label for="nome" class="form-label">Nome</label>
          <input
            v-model="formularioConta.nome"
            type="text"
            class="form-control"
            id="nome"
            placeholder="Digite o nome do produto..."
            required
          />
          <div class="invalid-feedback">O nome é obrigatório</div>
        </div>
        <div class="col-12">
          <label for="imagem" class="form-label">Imagem</label>
          <input
            v-model="formularioConta.imagem"
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="Insira a URL da sua imagem"
            required
          />
          <div class="invalid-feedback">Insira uma URL válida para a sua imagem</div>
        </div>
        <div class="col-12">
          <label for="precoVenda" class="form-label">Preço venda</label>
          <input
            v-model="formularioConta.precoVenda"
            v-bind="configMoeda"
            type="number"
            step="0.01"
            class="form-control"
            id="preco"
            placeholder="Informe o preço do produto"
            required
          />
          <div class="invalid-feedback">Informe um preço válido</div>
        </div>
        <div class="col-md-4">
          <label for="estoqueAtual" class="form-label">Estoque atual</label>
          <input
            v-model="formularioConta.estoqueAtual"
            type="text"
            class="form-control"
            id="estoque"
          />
        </div>
        <div class="col-md-4">
          <label for="marca" class="form-label">Marca</label>
          <input
            v-model="formularioConta.marca"
            type="text"
            class="form-control"
            id="marca"
            required
          />
        </div>
        <div class="col-md-4">
          <label for="categoria" class="form-label">Categoria</label>
          <select id="categoria" class="form-select" v-model="formularioConta.categoriaId">
            <option value="" disabled>Selecione uma opção...</option>
            <option
              v-for="categoria in categorias"
              :key="categoria.id"
              :value="categoria.id"
              required
            >
              {{ categoria.nome }}
            </option>
          </select>
          <div class="invalid-feedback">Informe uma categoria</div>
        </div>
        <div class="col-md-12">
          <label for="descricao" class="form-label">Descrição</label>
          <textarea
            v-model="formularioConta.descricao"
            class="form-control"
            id="descricao"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="col-md-12">
          <div class="form-check">
            <input v-model="formularioConta.ativo" class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck"> Ativo </label>
          </div>
        </div>
        <div class="col-12 d-flex justify-content-between">
          <button type="submit" class="btn btn-success">
            {{ isEdicao ? "Salvar Alterações" : "Cadastrar Produto" }}
          </button>
          <RouterLink class="btn btn-primary" to="/manager/produto">Voltar</RouterLink>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}

.form {
  padding: 20px;
  background-color: lightgray;
  border-radius: 5px;
}
</style>
