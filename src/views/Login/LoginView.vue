<script lang="ts" setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { authService } from "@/services/authService";
import { type AxiosError } from "axios";
import { type ErroResponse } from "@/types/auth";

import Swal from "sweetalert2";

const { login } = useAuth();

const email = ref<string>("");
const senha = ref<string>("");
const erro = ref<string>("");
const carregando = ref<boolean>(false);
const router = useRouter();

const handleLogin = async () => {
  try {
    carregando.value = true;
    erro.value = "";

    const response = await authService.login(email.value, senha.value);

    if (response && response.token) {
      login(response.token);
    }

    Swal.fire({
      title: "Sucesso",
      text: "Login efetuado com sucesso",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#7367F0",
    }).then(() => {
      router.push("/");
    });
  } catch (e) {
    const axiosError = e as AxiosError<ErroResponse>;
    Swal.fire({
      title: "Erro!",
      text: "E-mail ou senha inválidos",
      icon: "error",
      confirmButtonText: "Tentar novamente",
    });
    erro.value = axiosError.response?.data?.mensagem || "Falha ao realizar login";
  } finally {
    carregando.value = false;
  }
};
</script>

<template>
  <main class="container py-5">
    <div class="login-container mx-auto shadow">
      <section class="login-box">
        <h1 class="mb-2">Acesse sua conta</h1>
        <p class="text-secondary mb-4">Informe seus dados para continuar</p>

        <form @submit.prevent="handleLogin" class="w-100">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label"> E-mail </label>

            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Digite seu e-mail"
            />
          </div>

          <!-- Senha -->
          <div class="mb-2">
            <label for="senha" class="form-label"> Senha </label>

            <input
              v-model="senha"
              type="password"
              id="senha"
              class="form-control"
              placeholder="Digite sua senha"
            />
          </div>

          <!-- Erro -->
          <p v-if="erro" class="error-msg">
            {{ erro }}
          </p>

          <!-- Esqueceu -->
          <div class="text-end mb-4">
            <a href="#" class="forgot-password"> Esqueceu sua senha? </a>
          </div>

          <!-- Botão -->
          <button :disabled="carregando" type="submit" class="btn btn-primary w-100">
            {{ carregando ? "Entrando..." : "Acessar Conta" }}
          </button>
        </form>
      </section>

      <!-- Lado Cadastro -->
      <section class="register-box">
        <h2>Novo por aqui?</h2>

        <p class="mt-3 mb-4">Crie sua conta e obtenha o acesso.</p>

        <RouterLink to="/cadastro">
          <button class="btn btn-light px-4">Criar Conta</button>
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #fff;
}

.login-container {
  width: 100%;
  max-width: 950px;
  min-height: 550px;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: white;
  opacity: 0;
  transform: translateY(50px);

  animation: subir 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes subir {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Login */
.login-box {
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-box h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
}

/* Cadastro */
.register-box {
  background-color: #005373;
  color: white;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.register-box h2 {
  font-size: 2rem;
  font-weight: 700;
}
.register-box p {
  color: white;
}

/* Inputs */
.form-label {
  font-weight: 600;
  color: #495057;
}

.form-control {
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ced4da;
}

.form-control:focus {
  box-shadow: none;
  border-color: #3b82f6;
}

/* Botões */
.btn {
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
}

/* Links */
.forgot-password {
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Erro */
.error-msg {
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
}

/* Responsividade */
@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
  }

  .register-box {
    padding: 40px;
  }

  .login-box {
    padding: 40px;
  }
}
</style>
