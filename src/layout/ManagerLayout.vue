<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";

const { tipoUsuario, usuarioNome, logout} = useAuth();

const handleDeslogar = () => {
  Swal.fire({
    title: "Deslogando",
    text: "Você tem certeza que deseja sair?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Saindo",
        text: "Volte sempre",
        icon: "success",
      });
      logout();
    }
  });
}

console.log("Tipo user " + tipoUsuario.value);
</script>

<template>
  <div class="container-fluid" v-if="['Administrador', 'Admin'].includes(tipoUsuario)">
    <div class="row">
      <nav class="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar vh-100 p-0 border-end">
        <div class="p-4">
          <div class="logo-img d-flex align-items-center">
            <img src="@/assets/images/logo/bytech_logo.svg" />
          </div>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <RouterLink class="nav-link mb-2" to="/manager/produto"> Produto </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link mb-2" to="/">Voltar</RouterLink>
            </li>
            <li class="nav-item">
              <button class="btn btn-danger" @click="handleDeslogar">Sair</button>
            </li>
          </ul>
        </div>
      </nav>

      <nav class="navbar navbar-light bg-light d-md-none p-3">
        <div class="logo-img">
          <img src="@/assets/images/logo/bytech_logo.svg" />
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mobileMenu">
          <ul class="navbar-nav pt-2">
            <li>
              <RouterLink class="nav-link mb-2" to="/manager/produto"> Produto </RouterLink>
            </li>
            <li>

            </li>
          </ul>
        </div>
      </nav>
      <main
        class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-light"
        v-if="['Administrador', 'Admin'].includes(tipoUsuario)"
      >
        <RouterView />
      </main>
    </div>
  </div>

  <h1 v-else>Acesso Negado!</h1>
</template>

<style scoped>
* {
  font-size: 16px;
}
main {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.sidebar {
  background-color: #f1f1f1 !important;
}

/* Simula o visual do 'well' do Bootstrap 3 usando cards do BS5 */
.card {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
}

/* Ajuste para o item de menu ativo */
.nav-pills .nav-link.active {
  background-color: #337ab7; /* Azul clássico do BS3 */
}

.nav-link {
  color: #337ab7;
}

.logo-img img {
  position: relative;
  height: 120px;
  width: 190px;
  flex: 1;
}

.logo-img img:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.boas-vindas {
  font-size: 70px;
}
</style>
