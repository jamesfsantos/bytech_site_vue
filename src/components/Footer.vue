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
  background: #005373;

  width: 100%;

  padding: 60px 25px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 40px;

  border-top: 1px solid rgba(255,255,255,.12);
}



.logo-img img {
  width: 190px;

  transition: .25s ease;
}

.logo-img img:hover {
  transform: scale(1.05);
}



.footer-content {
  width: 100%;
  max-width: 1300px;

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 60px;
}


.contato,
.redes-sociais,
.rodape-nav {
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 18px;
}


h4 {
  color: white;

  font-size: 1.5rem;

  font-weight: bold;

  margin-bottom: 10px;
}



a {
  color: #dff4ff;

  text-decoration: none;

  display: flex;
  align-items: center;

  gap: 12px;

  font-size: 1.1rem;

  font-weight: 500;

  transition: .2s ease;
}

a:hover {
  color: white;

  transform: translateX(4px);
}


i {
  font-size: 1.3rem;
}



ul {
  list-style: none;

  display: flex;
  flex-direction: column;

  gap: 18px;

  padding: 0;
  margin: 0;
}


@media (max-width: 900px) {

  .footer-content {
    grid-template-columns: 1fr;

    gap: 40px;
  }

}

@media (max-width: 600px) {

  footer {
    padding: 45px 20px;
  }

  .logo-img img {
    width: 160px;
  }

  h4 {
    font-size: 1.3rem;
  }

  a {
    font-size: 1rem;
  }

  i {
    font-size: 1.15rem;
  }

}
</style>
