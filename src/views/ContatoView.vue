<template>
  <main>
    <div class="contato">
      <h2>Contato</h2>
      <br />
      <p>
        Entre em contato conosco para mais informações sobre nossos serviços e soluções
        personalizadas.
      </p>
      <br />

      <h2>Tire suas dúvidas</h2>
      <section>
        <form>
          <fieldset>
            <legend>Informações de contato</legend>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" /><br />
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" /><br />
            <label for="comentarios">Comentários:</label><br />
            <textarea
              id="comentarios"
              name="comentarios"
              rows="4"
              cols="50"
              placeholder="Digite sua duvida aqui"
            ></textarea
            ><br />
            <button class="btn-feedback" onclick="alert('FEEDBACK ENVIADO')">Enviar</button>
          </fieldset>
        </form>
      </section>
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
  </main>
</template>

<style scoped>
.contato {
  position: relative;
  background-color: lightgray;
  border: 1px solid #3b8cbe;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
  font-size: 1rem;
  border-radius: 0px;
  width: 80%;
  height: auto;
  margin: 0;
}

.contato i {
  font-size: 50px;
  margin-top: 20px;
  padding-bottom: 20px;
  color: #3b8cbe;
}

.contato li {
  list-style-type: none;
  color: rgb(34, 34, 34);
}

.contato h2 {
  color: #ececec;
  background-color: #3b8cbe;
}

fieldset {
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-width: 30px;
  border: 1px solid #3b8cbe;
}

fieldset textarea {
  border: 1px solid #3b8cbe;
  width: 50%;
  height: 200px;
}

fieldset textarea:focus {
  border: 3px solid #96e4fd;
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

div.contato label {
  font-weight: bold;
}

div.contato input {
  height: 2rem;
  width: 50%;
  padding: 0.6rem;
  border: 2px solid #3b8cbe;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
}

div.contato input:focus {
  border: 3px solid #96e4fd;
}

.btn-feedback:hover {
    border: 1px solid #93DFF8;
    background-color: #005f96;
    cursor: pointer;
    text-decoration: underline;
    font-size: 16px;
box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.308);
}

@media (max-width: 600px) {
  .contato {
    width: auto;
    height: auto;
  }
}
</style>
