<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuth } from "@/composables/useAuth";
import Swal from "sweetalert2";
import produtoService from "@/services/produtoService";
import type { ProdutoModel } from "@/models/produtoModel";

const { estaLogado, usuarioNome, logout, tipoUsuario } = useAuth();

const isMenuOpen = ref(false);
const textoPesquisa = ref("");

const resultados = ref<ProdutoModel[]>([]);
const carregando = ref(false);
let timerBusca: any = null;

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
  resultados.value = [];
};


watch(textoPesquisa, (novoTexto) => {
  clearTimeout(timerBusca);

  if (novoTexto.length < 3) {
    resultados.value = [];
    return;
  }

  timerBusca = setTimeout(async () => {
    carregando.value = true;
    try {
      const resposta = await produtoService.buscarProdutosNome(novoTexto);
      resultados.value = resposta;
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      carregando.value = false;
    }
  }, 500);
});

const fecharResultados = () => {

  setTimeout(() => {
    resultados.value = [];
  }, 400);
};

const handleDeslogar = () => {
  closeMenu();
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
      logout();
      Swal.fire({
        title: "Saindo...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};
</script>

<template>
  <header>
    <div class="logo-img">
      <RouterLink to="/" @click="closeMenu">
        <img
          src="@/assets/images/logo/bytech_logo.svg"
          alt="logo"
          title="Voltar a pagina inicial"
        />
      </RouterLink>
    </div>

    <div class="nav-pesquisa desktop-only">
      <section class="pesquisa">
        <input
          v-model="textoPesquisa"
          type="text"
          placeholder="Pesquisar um produto..."
          @blur="fecharResultados"
          @focus="carregando = true"
        />
        <i class="fa-solid fa-magnifying-glass"></i>

        <ul v-if="resultados.length > 0" class="resultados-suspensos">
          <li v-for="prod in resultados" :key="prod.id">
            <RouterLink
              :to="`/produto/${prod.id}`"
              class="resultado-item"
              @click="fecharResultados"
            >
              <span class="nome">{{ prod.nome }}</span>
              <span class="preco">R$ {{ prod.precoVenda.toLocaleString("pt-BR") }}</span>
            </RouterLink>
          </li>
        </ul>
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

    <div class="nav-login">
      <section class="avatar desktop-only"><i class="fa-regular fa-circle-user"></i></section>

      <section class="logintext desktop-only" v-if="estaLogado">
        Olá! {{ usuarioNome }} <br />
        <button class="btn-sair" @click="handleDeslogar">Sair</button>
      </section>

      <section class="logintext desktop-only" v-else>
        Entre ou <RouterLink to="/cadastro"><br />Cadastre-se</RouterLink>
      </section>

      <div class="actions-icons">
        <RouterLink to="/login" v-if="!estaLogado" class="desktop-only">
          <button class="login">Login <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
        </RouterLink>

        <RouterLink to="/carrinho" @click="closeMenu">
          <button class="login icon-btn"><i class="fa-solid fa-cart-shopping"></i></button>
        </RouterLink>

        <RouterLink
          to="/manager/visao-geral"
          v-if="['Administrador', 'Admin'].includes(tipoUsuario)"
          class="desktop-only"
        >
          <button class="login">Manager <i class="fa fa-pencil"></i></button>
        </RouterLink>

        <RouterLink to="/pedidos" class="desktop-only">
          <button class="lista login icon-btn"><i class="fa-solid fa-list"></i></button>
        </RouterLink>

        <button
          class="hamburger"
          :class="{ active: isMenuOpen }"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <transition name="fade">
      <div class="mobile-menu" v-if="isMenuOpen">
        <div class="mobile-content">
          <div class="nav-pesquisa-mobile">
            <section class="pesquisa">
              <input
                v-model="textoPesquisa"
                type="text"
                placeholder="Pesquisar um produto..."
                @blur="fecharResultados"
              />
              <i class="fa-solid fa-magnifying-glass"></i>

              <ul v-if="resultados.length > 0" class="resultados-suspensos mobile">
                <li v-for="prod in resultados" :key="prod.id">
                  <RouterLink :to="`/produto/${prod.id}`" @click="closeMenu">
                    {{ prod.nome }}
                  </RouterLink>
                </li>
              </ul>
            </section>
          </div>

          <nav class="nav-mobile">
            <ul>
              <li>
                <RouterLink to="/produtos/categoria/video-games" @click="closeMenu"
                  >Videogames</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/produtos/categoria/computadores" @click="closeMenu"
                  >Computador</RouterLink
                >
              </li>
              <li><RouterLink to="/contato" @click="closeMenu">Contato</RouterLink></li>
              <li><RouterLink to="/servicos" @click="closeMenu">Serviços</RouterLink></li>
              <hr />
              <li v-if="estaLogado" class="user-info-mobile">
                <span>Olá, {{ usuarioNome }}</span>
                <button class="btn-sair-mobile" @click="handleDeslogar">Sair da Conta</button>
              </li>
              <li v-else>
                <RouterLink to="/login" @click="closeMenu">Entrar / Cadastrar</RouterLink>
              </li>
              <li v-if="['Administrador', 'Admin'].includes(tipoUsuario)">
                <RouterLink to="/manager/visao-geral" @click="closeMenu" class="manager-link"
                  >Painel Manager</RouterLink
                >
              </li>
              <li><RouterLink to="/pedidos" @click="closeMenu">Meus Pedidos</RouterLink></li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: #005373;
  height: 100px;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.logo-img img {
  height: 90px;
  width: auto;
  transition: 0.3s ease;
}

.nav-pesquisa {
  flex: 1;
  max-width: 400px;
}

.pesquisa {
  position: relative;
  width: 100%;
}

.pesquisa input {
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 20px;
  padding: 0 45px 0 20px;
  outline: none;
  background: white;
  color: #333;
}

.pesquisa i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #005373;
}


.resultados-suspensos {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white !important;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  list-style: none;
  padding: 10px 0;
  z-index: 9999;
  max-height: 300px;
  overflow-y: auto;
  display: block !important;
}

.resultado-item {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  text-decoration: none;
  border-bottom: 1px solid #eee;
  background: white;
}

.resultado-item:hover {
  background: #f1f5f9;
}

.resultado-item .nome {
  color: #333 !important;
  font-weight: bold;
  font-size: 14px;
}
.resultado-item .preco {
  color: #005373 !important;
  font-size: 12px;
}


.resultados-suspensos.mobile {
  position: relative;
  top: 5px;
  box-shadow: none;
  border: 1px solid #ddd;
  z-index: 1001;
}

.resultados-suspensos.mobile a {
  color: #333 !important;
  font-weight: 500;
  padding: 12px;
  display: block;
}


.nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav li a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.nav-login {
  display: flex;
  align-items: center;
  gap: 15px;
}

.actions-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.login {
  height: 40px;
  border: none;
  border-radius: 10px;
  padding: 0 15px;
  background: white;
  color: #005373;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.login i {
  color: #005373;
}

.logintext {
  color: white;
  font-size: 0.85rem;
  line-height: 1.2;
}

.btn-sair {
  background: none;
  border: none;
  color: #ffcfcf;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  font-size: 0.8rem;
  text-decoration: underline;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 10px;
  transition: 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(8.5px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: translateY(-8.5px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  height: calc(100vh - 100px);
  background: #004560;
  z-index: 999;
  overflow-y: auto;
}

.mobile-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.nav-mobile ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-mobile li a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  display: block;
}

.user-info-mobile {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #cdefff;
}

.btn-sair-mobile {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.manager-link {
  color: #ffd700 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1100px) {
  header {
    padding: 0 20px;
  }
  .desktop-only {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .nav-pesquisa {
    display: none;
  }
}
</style>
