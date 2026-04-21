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
      <section class="logintext">
        Olá! Entre <br />
        ou <RouterLink to="cadastro">Cadastre-se</RouterLink>
      </section>
      <RouterLink to="/login"
        ><button class="login">Login <i class="fa-solid fa-arrow-right-to-bracket"></i></button
      ></RouterLink>

      <RouterLink to="/carrinho">
        <button class="login"><i class="fa-solid fa-cart-shopping"></i></button>
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
          <li><a href="computadores.html"> Computadores </a></li>
          <li><a href="videogames.html"> Videogames </a></li>
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
