<template>
  <footer>

    <div class="rodape-nav">
      <ul>
        <li>
          <RouterLink to="/quem-somos">Quem somos</RouterLink>
        </li>
        <li>
          <RouterLink to="/servicos">Serviços</RouterLink>
        </li>
        <li><a href="#">Orçamentos</a></li>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li><a href="#">Voltar ao topo</a></li>
      </ul>
    </div>

    <div class="logo-img">
      <RouterLink to="/"><img src="@/assets/images/logo/bytech_logo.svg" alt="logo" title="Voltar a pagina inicial">
      </RouterLink>
    </div>

    <div class="contato">
      <h4>Canais de atendimento</h4>
      <a href=""><i class="fa-brands fa-whatsapp"></i>(11) 99999-9999</a>
      <a href=""><i class="fa-solid fa-phone-volume"></i>(11) 3999-9999</a>
      <a href=""><i class="fa-solid fa-envelope"></i>Bytech.Senac@Email.com.br</a>
      <a href=""><i class="fa-regular fa-comments"></i>Chatbot</a>
    </div>

  </footer>
</template>
<style scoped>
footer {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  margin: auto;
  background-color: #005373;
  height: auto;
  width: 100%;
  bottom: 0;
}

.rodape-nav {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.contato {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

h4 {
  color: rgb(245, 245, 245);
}

ul {
  display: flex;
  list-style: none;
  text-decoration: none;
  color: rgb(245, 245, 245);
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

a {
  color: rgb(245, 245, 245);
  text-decoration: none;
}

a:hover {
  color: rgb(245, 245, 245);
  text-decoration: underline;
}

@media (max-width: 600px) {

  footer {
    flex-direction: column;
  }

}
</style>