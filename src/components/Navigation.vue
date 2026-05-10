<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";


const { usuarioEmail, estaLogado, usuarioNome, logout, tipoUsuario } = useAuth();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

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

    <div class="nav-login">
      <section class="avatar"><i class="fa-regular fa-circle-user"></i></section>

      <section class="logintext" v-if="estaLogado">
        Olá! {{ usuarioNome }} <br />
        <button class="btn-sair" @click="handleDeslogar">Sair</button>
      </section>

      <section class="logintext" v-else>
        Entre ou <RouterLink to="/cadastro"><br />Cadastre-se</RouterLink>
      </section>

      <section class="logintext" v-if="!estaLogado">
        <RouterLink to="/login">
          <button class="login">Login <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
        </RouterLink>
      </section>

      <RouterLink to="/carrinho">
        <button class="login"><i class="fa-solid fa-cart-shopping"></i></button>
      </RouterLink>

      <RouterLink to="/manager/visao-geral" v-if="['Administrador', 'Admin'].includes(tipoUsuario)">
        <button class="login">Manager<i class="fa fa-pencil" aria-hidden="true"></i></button>
      </RouterLink>
      <RouterLink to="/pedidos">
        <button class="lista login"><i class="fa-solid fa-list"></i></button>
      </RouterLink>

      <!-- Botão hamburguer (visível apenas em mobile) -->
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="mobile-menu" :class="{ open: isMenuOpen }">
      <div class="nav-pesquisa">
        <section class="pesquisa">
          <input class="pesquisa" type="text" placeholder="Pesquisar um produto..." />
          <i class="fa-solid fa-magnifying-glass"></i>
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

    <div class="nav-pesquisa desktop-only">
      <section class="pesquisa">
        <input class="pesquisa" type="text" placeholder="Pesquisar um produto..." />
        <i class="fa-solid fa-magnifying-glass"></i>
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
<style scoped>
.avatar i {
  color: white;
}

/* Isso força os ícones que estão dentro dos botões brancos a ficarem azuis */
.login i,
.fa-cart-shopping,
.fa-list,
.fa-pencil,
.fa-arrow-right-to-bracket {
  color: #005373; /* Cor azul do seu header */
}

header {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 40px;

  background: #005373;

  height: 100px;

  gap: 20px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}



.logo-img img {
  height: 115px;
  width: 180px;

  transition: 0.25s ease;
}

.logo-img img:hover {
  transform: scale(1.05);
  cursor: pointer;
}


.nav-pesquisa {
  width: 100%;
  max-width: 500px;

  display: flex;
  align-items: center;
}

.pesquisa {
  position: relative;

  width: 100%;
}

.pesquisa input {
  width: 100%;
  height: 46px;

  border: none;
  border-radius: 14px;

  padding: 0 45px 0 18px;

  outline: none;

  background: #ffffff;

  color: #2d2d2d;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.pesquisa i {
  position: absolute;

  right: 16px;
  top: 50%;

  transform: translateY(-50%);

  color: #005373;
}



.nav ul {
  display: flex;
  gap: 18px;

  list-style: none;
}

.nav li a {
  color: white;

  text-decoration: none;

  font-weight: 600;

  transition: 0.2s;
}

.nav li a:hover {
  color: #cdefff;
}



.nav-login {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logintext,
.logintext a,
.btn-login,
.btn-sair {
  color: white;

  text-decoration: none;

  background: transparent;

  border: none;

  font-weight: bold;

  cursor: pointer;
}

.avatar i,
.fa-cart-shopping,
.fa-list,
.fa-pencil,
.fa-arrow-right-to-bracket {
  color: white;
}


.login {
  height: 42px;

  border: none;

  border-radius: 12px;

  padding: 0 18px;

  background: white;

  color: #005373;

  font-weight: bold;

  cursor: pointer;

  transition: 0.2s ease;
}

.login:hover {
  background: #dff4ff;
}


.hamburger {
  display: none;

  flex-direction: column;

  gap: 5px;

  background: transparent;

  border: none;

  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 3px;

  background: white;

  border-radius: 3px;

  transition: 0.3s;
}


.mobile-menu {
  display: none;
}



@media (max-width: 900px) {
  header {
    flex-wrap: wrap;

    height: auto;

    padding: 20px;

    justify-content: center;
  }

  .desktop-only {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu.open {
    display: flex;

    flex-direction: column;

    gap: 20px;

    width: 100%;

    padding-top: 20px;
  }

  .mobile-menu .nav ul {
    flex-direction: column;

    align-items: center;
  }

  .nav ul {
    flex-wrap: wrap;

    justify-content: center;
  }
}
</style>
