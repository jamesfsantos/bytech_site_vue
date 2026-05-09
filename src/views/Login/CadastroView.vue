<script lang="ts" setup>
import { ref, watch } from "vue";
import usuarioService from "@/services/usuarioService";
import { useRouter } from "vue-router";

const mensagemErroUI = ref("");
const carregando = ref(false);

const router = useRouter();
const formularioConta = ref({
  nome: "",
  email: "",
  senha: "",
  celular: "",
  cpf: "",
  endereco: "",
  cidade: "",
  complemento: "",
  cep: "",
  confirmarSenha: "",
  tipoUsuarioId: 2,
});

watch(
  () => formularioConta.value.cpf,
  (novoValor) => {
    let v = novoValor.replace(/\D/g, ""); // Remove tudo que não é número
    if (v.length > 11) v = v.slice(0, 11); // Não permite mais que 11 digitos!

    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    formularioConta.value.cpf = v;
  },
);

watch(
  () => formularioConta.value.celular,
  (novoValor) => {
    let v = novoValor.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    formularioConta.value.celular = v;
  },
);

watch(
  () => formularioConta.value.cep,
  (novoValor) => {
    let v = novoValor.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);

    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    formularioConta.value.cep = v;
  },
);

async function realizarCadastro() {
  mensagemErroUI.value = "";
  carregando.value = true;
  try {
    if (!formularioConta.value) {
      alert("Insira os campos!");
      return;
    }

    if (formularioConta.value.senha !== formularioConta.value.confirmarSenha) {
      alert("As senhas não conferem!");
      return;
    }

    const dadosParaEnviar = {
      ...formularioConta.value,
      cpf: formularioConta.value.cpf.replace(/\D/g, ""),
      celular: formularioConta.value.celular.replace(/\D/g, ""),
      cep: formularioConta.value.cep.replace(/\D/g, ""),
    };

    const { confirmarSenha, ...dados } = dadosParaEnviar;

    const cadastro = await usuarioService.cadastrarUsuario(dados);

    if (cadastro) {
      alert("Cadastro feito com sucesso!");
      router.push("/login");
    } else {
      alert("Erro ao criar a conta. Verifique os dados!");
    }
  } catch (error: any) {
    if (error.data && error.data.message) {
      mensagemErroUI.value = error.data.message;
    } else if (error.response?.data?.message) {
      mensagemErroUI.value = error.response.data.message;
    } else {
      mensagemErroUI.value = "Erro ao tentar cadastrar usuário.";
    }
  } finally {
    carregando.value = false;
  }
}
</script>

<template>
  <main class="container py-5">
    <div v-if="mensagemErroUI" class="alert alert-danger alert-dismissible fade show" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ mensagemErroUI }}
      <button type="button" class="btn-close" @click="mensagemErroUI = ''"></button>
    </div>
    <div class="criar-conta mx-auto">
      <h1 class="mb-4 text-center">Criar Conta</h1>

      <section class="form shadow">
        <form class="row g-3" @submit.prevent="realizarCadastro()" novalidate>
          <div class="col-12">
            <label for="nome" class="form-label">Nome completo</label>
            <input
              v-model="formularioConta.nome"
              type="text"
              class="form-control"
              id="nome"
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div class="col-md-6">
            <label for="email" class="form-label">E-mail</label>
            <input
              v-model="formularioConta.email"
              type="email"
              class="form-control"
              id="email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div class="col-md-6">
            <label for="celular" class="form-label">Celular</label>
            <input
              v-model="formularioConta.celular"
              type="tel"
              class="form-control"
              maxlength="15"
              id="celular"
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div class="col-md-4">
            <label for="cep" class="form-label">CEP</label>
            <input
              v-model="formularioConta.cep"
              type="text"
              class="form-control"
              maxlength="9"
              id="cep"
              placeholder="00000-000"
              required
            />
          </div>
          <div class="col-md-4">
            <label for="cpf" class="form-label">CPF</label>
            <input
              v-model="formularioConta.cpf"
              type="text"
              class="form-control"
              maxlength="14"
              id="cpf"
              placeholder="000.000.000-00"
              required
            />
          </div>
          <!-- Cidade -->
          <div class="col-md-4">
            <label for="cidade" class="form-label">Cidade</label>
            <input
              v-model="formularioConta.cidade"
              type="text"
              class="form-control"
              id="cidade"
              placeholder="Digite sua cidade"
              required
            />
          </div>

          <!-- Endereço -->
          <div class="col-12">
            <label for="endereco" class="form-label">Endereço</label>
            <input
              v-model="formularioConta.endereco"
              type="text"
              class="form-control"
              id="endereco"
              placeholder="Rua, número e bairro"
              required
            />
          </div>

          <!-- Complemento -->
          <div class="col-12">
            <label for="complemento" class="form-label"> Complemento </label>

            <input
              v-model="formularioConta.complemento"
              type="text"
              class="form-control"
              id="complemento"
              placeholder="Apartamento, bloco, referência..."
            />
          </div>

          <!-- Senha -->
          <div class="col-md-6">
            <label for="senha" class="form-label">Senha</label>
            <input
              v-model="formularioConta.senha"
              type="password"
              class="form-control"
              id="senha"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <!-- Confirmar Senha -->
          <div class="col-md-6">
            <label for="confirmarSenha" class="form-label"> Confirmar senha </label>

            <input
              v-model="formularioConta.confirmarSenha"
              type="password"
              class="form-control"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              required
            />
          </div>

          <!-- Botões -->
          <div class="col-12 d-flex justify-content-end gap-2 mt-4">
            <button type="reset" class="btn btn-outline-secondary px-4">
              <RouterLink to="/">Cancelar</RouterLink>
            </button>

            <button type="submit" class="btn btn-primary" :disabled="carregando">
              <span v-if="carregando" class="spinner-border spinner-border-sm me-2"></span>
              {{ carregando ? "Processando..." : "Criar Conta" }}
            </button>
          </div>
        </form>
      </section>

      <p class="text-center mt-4 text-secondary">
        Já possui uma conta?
        <RouterLink to="/login">Entrar</RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  background: #fff;
}

.criar-conta {
  max-width: 850px;
}

h1 {
  font-weight: 700;
  color: #212529;
}

.form {
  background-color: white;
  padding: 35px;
  border-radius: 16px;
}

.form-label {
  font-weight: 600;
  color: #495057;
}

.form-control {
  height: 48px;
  border-radius: 10px;
}

.btn {
  height: 45px;
  border-radius: 10px;
  font-weight: 600;
}

a {
  text-decoration: none;
  font-weight: 600;
}
</style>
