<script lang="ts" setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { authService } from "@/services/authService";
import { type AxiosError } from "axios";
import { type ErroResponse } from "@/types/auth";

import Swal from "sweetalert2";

const {login} = useAuth();

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
  <main>
    <form class="Login" @submit.prevent="handleLogin">
      <h1>Acesse sua conta</h1>
      <p>informe seus dados para continuar</p>
      <br />

      <label for="email">E-mail:</label>
      <input
        v-model="email"
        type="email"
        id="email"
        name="email"
        placeholder="Insira seu E-mail"
      /><br />

      <label for="senha">Senha:</label>
      <input
        v-model="senha"
        type="password"
        id="senha"
        name="senha"
        placeholder="Insira sua Senha"
      /><br />

      <button :disabled="carregando" type="submit" class="btnAcessar">Acessar Conta</button><br />
      <p v-if="erro" class="error-msg">{{ erro }}</p>

      <p class="esqSenha">Esqueceu sua senha?</p>
      <br />
    </form>

    <div class="Nova-Conta">
      <h2>Criar sua conta</h2>
      <br />
      <p>Clique no botão abaixo para criar sua conta:</p>
      <br />

      <RouterLink to="/cadastro"><button class="btnCriar">Criar Conta</button></RouterLink><br />
    </div>
  </main>
</template>
<style scoped>
.Login h1 {
  align-items: center;
  text-align: center;
  background-color: #3b8cbe;
  color: white;
  width: 100%;
}

.Login {
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #d3d3d3;
  font-size: 1rem;
  /* padding: 50px; */
  border: 1px solid #3b8cbe;
  width: 50%;
}

.Login label {
  font-weight: bold;
}

.Login input {
  height: 2rem;
  width: 50%;
  padding: 0.6rem;
  border: 2px solid #3b8cbe;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
}

.Login input:focus {
  border: 3px solid #96e4fd;
}

.Login button.btnAcessar,
.Nova-Conta button {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #3b8cbe;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: fit-content;
  color: white;
  font-weight: bold;
  cursor: pointer;
  min-height: 40px;
  text-transform: uppercase;
  padding: 10px;
}

.Nova-Conta a,
a:visited {
  text-decoration: none;
  color: white;
}

.Login button.btnAcessar:hover {
  background-color: #005373;
  border: 1px solid #0681c9;
}

.Nova-Conta button:hover {
  background-color: #005373;
  border: 1px solid #0681c9;
}

.Login .esqSenha {
  font-size: 14px;
  text-decoration: underline;
}

.Login .esqSenha:hover {
  color: #3b8cbe;
  cursor: pointer;
}

.Nova-Conta {
  display: flex;
  flex-direction: column;
  background-color: #d3d3d3;
  font-size: 1rem;
  /* padding: 50px; */
  border: 1px solid #3b8cbe;
  width: 50%;
}

.Nova-Conta h2 {
  align-items: center;
  text-align: center;
  background-color: #3b8cbe;
  color: white;
  width: 100%;
}

.Nova-Conta p {
  align-items: center;
  text-align: center;
  font-size: 14px;
}
</style>
