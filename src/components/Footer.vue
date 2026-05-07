<template>
  <footer>

    <div class="logo-img">
      <RouterLink to="/">
        <img src="@/assets/images/logo/bytech_logo.svg" alt="logo" title="Voltar a pagina inicial">
      </RouterLink>
    </div>

    <div class="footer-content">
      <div class="contato">
        <h4>Canais de atendimento</h4>
        <a href=""><i class="fa-brands fa-whatsapp"></i>(11) 99999-9999</a>
        <a href=""><i class="fa-solid fa-phone-volume"></i>(11) 3999-9999</a>
        <a href=""><i class="fa-solid fa-envelope"></i>email@email.com</a>
        <a href=""><i class="fa-regular fa-comments"></i>Chatbot</a>
      </div>

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

      <div class="redes-sociais">
        <h4>Siga-nos</h4>
        <a href=""><i class="fa-brands fa-facebook"></i>Facebook</a>
        <a href=""><i class="fa-brands fa-instagram"></i>Instagram</a>
        <a href=""><i class="fa-brands fa-twitter"></i>Twitter</a>
        <a href=""><i class="fa-brands fa-linkedin"></i>LinkedIn</a>
      </div>
    </div>

  </footer>
</template>

<style scoped>
footer {
  background-color: #005373;
  width: 100%;
  padding: 30px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.logo-img {
  margin-bottom: 20px;
}

.logo-img img {
  max-width: 150px;
}


.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  width: 100%;
  max-width: 900px;
}


.rodape-nav {
  display: flex;
  justify-content: center;
}


.contato,
.redes-sociais {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}


ul {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 5px;
}


h4 {
  color: white;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}


@media (max-width: 600px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
