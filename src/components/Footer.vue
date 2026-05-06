<template>
  <footer>
    
  <div class="rodape">
    <div class="logo-rodape">
  <div class="logo-img"><a href="index.html"><img src="@/assets/images/logo/bytech_logo.svg" alt="logo" title="Voltar a pagina inicial"></a></div>
    </div>
    <div class="texto-rodape">
      <ul>
        <li><RouterLink to="/quem-somos">Quem somos</RouterLink></li>
        <li><RouterLink to="/servicos">Serviços</RouterLink></li>
        <li><a href="#">Orçamentos</a></li>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><a href="#">Voltar ao topo</a></li>
      </ul>
    </div>
  </div>

      <div class="contato">
      <div class="contatoArea">
        <h2>Canais de atendimento</h2>
        <a href=""><i class="fa-brands fa-whatsapp"></i>(11) 99999-9999</a>
        <a href=""><i class="fa-solid fa-phone-volume"></i>(11) 3999-9999</a>
        <a href=""><i class="fa-solid fa-envelope"></i>Bytech.Senac@Email.com.br</a>
        <a href=""><i class="fa-regular fa-comments"></i>Chatbot</a>
      </div>
    </div>

</footer>
</template>
<style scoped>

footer {
     display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.contato {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  border-radius: 0px;
  width: 100%;
  height: auto;
  margin: auto;
  margin-bottom: 50px;
  margin-top: 20px;
}

.contato i {
  font-size: 50px;
  margin-top: 20px;
  padding-bottom: 20px;
  color: #93DFF8;
}

</style>