<script setup lang="ts">
import usuarioService from '@/services/usuarioService';
import { onMounted,ref } from 'vue';
import type { UsuarioModel} from '@/models/usuarioModel'

const usuario = ref<UsuarioModel>({
  nome: '',
  email: '',
  cpf: '',
  celular: '',
  endereco: '',
  complemento: '',
  cidade: '',
  cep: ''
} as UsuarioModel);

const email = localStorage.getItem('user_email') || ''

const exibirUsuario = async () => {
  try {
    const data = await usuarioService.buscarUsuario(email);
    usuario.value = data;
  } catch (error) {
    throw error
  }
}


onMounted(async () => {
  await exibirUsuario();
})
</script>

<template>
  <div class="container vh-100">
    <div class="row">
      <div class="col-6">
        <h1 class="mt-5">Editar Cadastro</h1>
      </div>

    </div>
    <section class="form mt-5">

      <form class="row g-3">
        <div class="col-12">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" v-model="usuario.nome" class="form-control" id="nome" placeholder="Digite o nome do produto..." required />
          <div class="invalid-feedback">O nome é obrigatório</div>
        </div>
        <div class="col-6">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="usuario.email" class="form-control" id="email" placeholder="Insira o email..." required />
          <div class="invalid-feedback">O email é obrigatório</div>
        </div>
        <div class="col-6">
          <label for="celular" class="form-label">Celular</label>
          <input type="text" class="form-control" id="celular" placeholder="Insira o celular..." required />
          <div class="invalid-feedback">Informe um número de celular válido</div>
        </div>
        <div class="col-md-4">
          <label for="cpf" class="form-label">CPF</label>
          <input type="text" v-model="usuario.cpf" class="form-control" id="cpf" placeholder="000.000.000-00" required />
        </div>
        <div class="col-md-4">
          <label for="endereco" class="form-label">Endereço</label>
          <input type="text" v-model="usuario.endereco" class="form-control" id="endereco" required />
        </div>
        <div class="col-md-4">
          <label for="complemento" class="form-label">Complemento</label>
          <input type="text" v-model="usuario.complemento" class="form-control" id="complemento" required />
        </div>
        <div class="col-md-6">
          <label for="cidade" class="form-label">Cidade</label>
          <input type="text" v-model="usuario.cidade" class="form-control" id="cidades" required />
        </div>
        <div class="col-md-6">
          <label for="Cep" class="form-label">CEP</label>
          <input type="text" v-model="usuario.cep" class="form-control" id="cep" required />
        </div>
        <div class="col-12 d-flex justify-content-between">

          <RouterLink class="btn btn-primary" to="/">Voltar</RouterLink>
        </div>
      </form>
    </section>
  </div>
</template>
<style scoped>
i {
  font-size: 100px;
  margin: 50px 0px;
}
</style>
