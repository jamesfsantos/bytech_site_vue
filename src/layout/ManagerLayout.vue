<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";

const { tipoUsuario, usuarioNome, logout } = useAuth();

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
};

console.log("Tipo user " + tipoUsuario.value);
</script>

<template>
  <div class="container-fluid min-vh-100" v-if="['Administrador', 'Admin'].includes(tipoUsuario)">
    <div class="row">
      <nav class="col-md-3 col-lg-2 d-none d-md-flex flex-column bg-white sidebar vh-100 p-0 border-end sticky-top">
        <div class="p-4 d-flex flex-column h-100">
          <div class="mb-4 text-center">
            <RouterLink to="/" class="logo-link">
              <img src="@/assets/images/logo/bytech_logo.svg" class="img-fluid sidebar-logo" />
            </RouterLink>
          </div>

          <ul class="nav nav-pills flex-column gap-2 flex-grow-1">
            <li class="nav-item">
              <RouterLink class="nav-link custom-link" to="/manager/visao-geral">
                <i class="fa-solid fa-chart-pie me-2"></i> Visão Geral
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link custom-link" to="/manager/produto">
                <i class="fa-solid fa-box-open me-2"></i> Produtos
              </RouterLink>
            </li>
          </ul>

          <div class="mt-auto pt-4 border-top">
            <button class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center" @click="handleDeslogar">
              <i class="fa-solid fa-right-from-bracket me-2"></i> Sair
            </button>
          </div>
        </div>
      </nav>

      <nav class="navbar navbar-light bg-white d-md-none p-3 border-bottom w-100">
        <div class="container-fluid">
          <img src="@/assets/images/logo/bytech_logo.svg" height="40" />
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobileMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mobileMenu">
            <ul class="navbar-nav pt-2">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/manager/visao-geral">Visão Geral</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/manager/produto">Produto</RouterLink>
              </li>
              <li class="nav-item">
                <button class="btn btn-danger btn-sm mt-2" @click="handleDeslogar">Sair</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-dashboard">
        <RouterView />
      </main>
    </div>
  </div>
  <div v-else class="vh-100 d-flex align-items-center justify-content-center">
     <h1 class="text-danger">Acesso Negado!</h1>
  </div>
</template>

<style scoped>
/* Estilo da Sidebar */
.sidebar {
  background-color: #ffffff !important;
  position: fixed; /* Mantém a sidebar fixa enquanto o conteúdo rola */
}

.bg-dashboard {
  background-color: #f4f7f9; /* Um cinza bem claro para o fundo do gráfico */
  min-height: 100vh;
}

/* Customização dos Links */
.custom-link {
  color: #64748b !important; /* Cinza moderno */
  background-color: transparent !important;
  font-weight: 500;
  padding: 12px 15px;
  transition: all 0.2s ease;
  border-radius: 8px !important;
}

.custom-link:hover {
  background-color: #f1f5f9 !important;
  color: #005373 !important;
  transform: translateX(5px);
}


.router-link-active.custom-link {
  background-color: #005373 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 83, 115, 0.2);
}


.sidebar-logo {
  max-height: 80px;
  transition: transform 0.3s ease;
}

.logo-link:hover .sidebar-logo {
  transform: scale(1.05);
}


@media (min-width: 768px) {
  main {
    margin-left: auto;
  }
}
</style>
