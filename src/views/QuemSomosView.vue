<template>

  <body>

    <main>

      <div class="conteudo">

        <div class="quem-somos">
          <h2>Quem somos:</h2><br>
          <p>Somos uma loja especializada em equipamentos de informática e tecnologia, oferecendo produtos e serviços de
            qualidade para atender às necessidades dos nossos clientes.</p>
          <br>
          <h2>Missão:</h2><br>
          <p>Entregar o melhor em
            Computadores, Videogames e Periféricos,
            atendendo às necessidades de
            cada cliente com qualidade,
            desempenho e eficiência.</p>
          <br>
          <h2>Valores:</h2><br>
          <ul>
            <li>Qualidade</li>
            <li>Inovação</li>
            <li>Compromisso</li>
            <li>Transparência</li>
            <li>Excelência</li>
          </ul>
          <br>
          <h2>Visão:</h2><br>
          <p>Ser referência em montagem de
            computadores e e manutenção, sendo
            reconhecida pela qualidade,
            confiabilidade e pelo impacto
            positivo em nossos
            clientes.</p> <br>



          <div class="contato">
            <div class="contatoArea">
              <h2>Canais de atendimento</h2>
              <a href=""><i class="fa-brands fa-whatsapp"></i>(11) 99999-9999</a>
              <a href=""><i class="fa-solid fa-phone-volume"></i>(11) 3999-9999</a>
              <a href=""><i class="fa-solid fa-envelope"></i>Bytech.Senac@Email.com.br</a>
              <a href=""><i class="fa-regular fa-comments"></i>Chatbot</a>
            </div>
          </div>

        </div>
      </div>
    </main>
  </body>

</template>


<style scoped>

.quem-somos {
    position: relative;
    background-color: lightgray;
    display: inline-block;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: none;
    width: 75%;
    height: auto;
    margin: auto;
    margin-bottom: 50px;
    margin-top: 20px;
    list-style-type: none;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
}

.quem-somos h2 {
    color: #ececec;
    background-color: #3b8cbe;
}

.quem-somos li {
    list-style-type: none;
}

.quem-somos i {

    font-size: 30px;
    color: #3b8cbe;
    padding-bottom: 20px;
    padding-top: 20px;
}

.contatoArea {
    flex-direction: row;
}

.contatoArea a {
display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: #3b8cbe;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    align-content: center;
    justify-content: center;
    align-items: center;
}

@media (max-width:768px) {  

  .quem-somos {
    width: 100%;
  }

    .contato {
        width: auto;
        height: auto;
    }
}
</style>
