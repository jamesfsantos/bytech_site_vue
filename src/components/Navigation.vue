<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";
const { usuarioEmail, estaLogado, usuarioNome, logout, tipoUsuario } = useAuth();

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
        title: "Saindo...",
        icon: "success",
      });
      logout();
    }
  });
};
</script>

<template>
  <header>
    <div class="logo-img">
      <RouterLink to="/">
        <img
          src="@/assets/images/logo/bytech_logo.svg"
          alt="logo"
          title="Voltar a pagina inicial"
        />
      </RouterLink>
    </div>

    <!-- Botões sempre visíveis -->
    <div class="nav-login">
      <section class="avatar"><i class="fa-regular fa-circle-user"></i></section>
      <section class="logintext" v-if="estaLogado">
        Olá! {{ usuarioNome }} <br />

        <button class="btn btn-danger" v-on:click="handleDeslogar">Sair</button>
      </section>
      <section class="logintext" v-else>
        Entre ou <RouterLink to="/cadastro">Cadastre-se</RouterLink>
        <RouterLink to="/login"
          ><button class="login">Login <i class="fa-solid fa-arrow-right-to-bracket"></i></button
        ></RouterLink>
      </section>

      <RouterLink to="/carrinho">
        <button class="login"><i class="fa-solid fa-cart-shopping"></i></button>
      </RouterLink>

      <RouterLink to="/manager" v-if="['Administrador', 'Admin'].includes(tipoUsuario)">
        <button class="login">Manager<i class="fa fa-pencil" aria-hidden="true"></i></button>
      </RouterLink>

      <!-- Botão hamburguer (visível apenas em mobile) -->
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Menu mobile (pesquisa + nav ficam aqui no mobile) -->
    <div class="mobile-menu" id="mobileMenu">
      <div class="nav-pesquisa">
        <section class="pesquisa">
          <input class="pesquisa" type="text" placeholder="Pesquisar" /><i
            class="fa-solid fa-magnifying-glass"
          ></i>
        </section>
      </div>
      <div class="nav">
        <ul>
          <li><RouterLink to="/produtos/categoria/video-games">Videogames</RouterLink></li>
          <li><RouterLink to="/produtos/categoria/computadores">Computador</RouterLink></li>
          <li><RouterLink to="/contato">Contato</RouterLink></li>
          <li><RouterLink to="/servicos">Serviços</RouterLink></li>
        </ul>
      </div>
    </div>

    <!-- Pesquisa e nav normais (visíveis apenas acima de 768px) -->
    <div class="nav-pesquisa desktop-only">
      <section class="pesquisa">
        <input class="pesquisa" type="text" placeholder="Pesquisar" /><i
          class="fa-solid fa-magnifying-glass"
        ></i>
      </section>
    </div>
    <div class="nav desktop-only">
      <ul>
        <li><RouterLink to="/produtos/categoria/video-games">Videogames</RouterLink></li>
        <li><RouterLink to="/produtos/categoria/computadores">Computador</RouterLink></li>
        <li><RouterLink to="/contato">Contato</RouterLink></li>
        <li><RouterLink to="/servicos">Serviços</RouterLink></li>
      </ul>
    </div>
  </header>
</template>
