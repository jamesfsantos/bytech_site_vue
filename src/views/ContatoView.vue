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
main {
  min-height: 100vh;

  background: #f4f8fb;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 40px;

  padding: 50px 20px;
}

/* =========================
   CARD CONTATO
========================= */

.contato {
  width: 100%;
  max-width: 1000px;

  background: white;

  border: 1px solid #dcecf3;

  border-radius: 28px;

  padding: 40px;

  box-shadow: 0 8px 24px rgba(0, 83, 115, 0.08);

  display: flex;
  flex-direction: column;

  gap: 25px;
}

/* =========================
   TITULOS
========================= */

.contato h2 {
  color: #005373;

  font-size: 2rem;

  font-weight: bold;

  text-align: center;
}

.contato p {
  color: #5d6b75;

  text-align: center;

  line-height: 1.8;

  font-size: 1.05rem;
}

/* =========================
   FORMULÁRIO
========================= */


fieldset {
  border: none;

  display: flex;
  flex-direction: column;

  gap: 12px; /* antes tava 20px */
}

label {
  color: #2d2d2d;

  font-weight: 600;

  margin-bottom: -4px;
}

input,
textarea {
  width: 100%;

  border: 1px solid #cfe2eb;

  border-radius: 14px;

  padding: 12px 16px; /* reduz altura */

  outline: none;

  background: #ffffff;

  transition: .2s ease;

  font-size: 1rem;
}

textarea {
  min-height: 140px; /* antes 180px */
}



input:focus,
textarea:focus {
  border-color: #3b8cbe;

  box-shadow: 0 0 0 4px rgba(59, 140, 190, 0.15);
}

textarea {
  min-height: 180px;

  resize: vertical;
}

/* =========================
   BOTÃO
========================= */

.btn-feedback {
  width: 220px;
  height: 52px;

  margin: 10px auto 0;

  border: none;

  border-radius: 14px;

  background: #005373;

  color: white;

  font-size: 1rem;
  font-weight: bold;

  cursor: pointer;

  transition: .25s ease;
}

.btn-feedback:hover {
  background: #0a6b92;

  transform: translateY(-2px);

  box-shadow: 0 10px 20px rgba(0, 83, 115, 0.15);
}

/* =========================
   CANAIS
========================= */

.contatoArea {
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 22px;
}

.contatoArea a {
  width: 100%;
  max-width: 500px;

  background: #f8fbfd;

  border: 1px solid #dcecf3;

  border-radius: 18px;

  padding: 18px 22px;

  display: flex;
  align-items: center;

  gap: 18px;

  text-decoration: none;

  color: #2d2d2d;

  font-size: 1.1rem;

  font-weight: 600;

  transition: .25s ease;
}

.contatoArea a:hover {
  transform: translateY(-3px);

  border-color: #3b8cbe;

  box-shadow: 0 10px 20px rgba(0, 83, 115, 0.12);
}

.contatoArea i {
  font-size: 2rem;

  color: #3b8cbe;

  min-width: 40px;
}

/* =========================
   RESPONSIVO
========================= */

@media (max-width: 768px) {
  .contato {
    padding: 25px;
  }

  .contato h2 {
    font-size: 1.6rem;
  }

  .contatoArea a {
    font-size: 1rem;

    padding: 16px;
  }

  .contatoArea i {
    font-size: 1.6rem;
  }

  .btn-feedback {
    width: 100%;
  }
}
</style>


