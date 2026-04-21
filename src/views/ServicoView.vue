<template>
  <main>
    <div class="conteudo">
      <div class="contato">
        <h2>Serviços</h2>

        <br />

        <h3>Reparo e Manutenção</h3>

        <br />

        <ul>
          <p>
            Qualidade, confiança e agilidade na manutenção do seu videogame. Seu console em boas
            mãos.
          </p>
        </ul>

        <br />

        <p>
          Nossa equipe técnica cuida do seu console ou PC com diagnóstico completo, peças originais
          e garantia no serviço
        </p>

        <br />

        <h2>Serviços de manutenção:</h2>

        <br />

        <div class="gallery">
          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/pcfix.jpg">
              <img src="@/assets/images/pcfix.jpg" />
            </a>
            <div class="desc">Manutenção para qualquer problema no PC</div>
            <button>Agende</button>
          </div>

          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/play.jpg">
              <img src="@/assets/images/ps5.jpg" />
            </a>
            <div class="desc">Manutenção para Playstation</div>
            <button>Agende</button>
          </div>

          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/xbox.jpg">
              <img src="@/assets/images/xbox.jpg" />
            </a>
            <div class="desc">Manutenção para Xbox</div>
            <button>Agende</button>
          </div>

          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/nintendo.jpg">
              <img src="@/assets/images/nintendo.jpg" />
            </a>
            <div class="desc">Manutenção para Nintendo</div>
            <button>Agende</button>
          </div>
        </div>

        <br />

        <h2>Canais de atendimento</h2>

        <a href=""><i class="fa-brands fa-whatsapp"></i></a>
        <a href=""><i class="fa-solid fa-phone-volume"></i></a>
        <a href=""><i class="fa-regular fa-comments"></i></a>
        <a href=""><i class="fa-solid fa-envelope"></i></a>
      </div>
      <!-- fecha contato -->
    </div>
    <!-- fecha conteudo -->
  </main>
</template>
<style scoped>
.contato {
  position: relative;
  background-color: lightgray;
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  border-radius: 20px;
  width: 80%;
  height: auto;
  margin: auto;
  margin-bottom: 0px;
  margin-top: 0px;
}

.contato i {
  font-size: 50px;
  margin-top: 20px;
  padding-bottom: 20px;
  color: #3b8cbe;
}

.contato h2 {
  color: #ececec;
  background-color: #3b8cbe;
}

fieldset {
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-width: 30px;
}

.img-mobile {
  display: none;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* CARD */
.gallery-item {
  border-radius: 15px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* IMAGEM */
.gallery-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

/* DESCRIÇÃO */
.gallery-item .desc {
  padding: 15px;
  text-align: center;
  font-size: 14px;
}

/* BOTÃO */
.gallery-item button {
  display: block;
  margin: 10px auto 20px;
  background: linear-gradient(135deg, #3b8cbe, #1b5280);
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.gallery-item button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.gallery-item button:active {
  transform: scale(0.95);
}

div.gallery {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-item button {
  position: relative;
  display: block;
  margin: 40px auto;
  background-color: #3b8cbe;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 100px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.gallery-item button:hover {
  background-color: #1b5280;
  border: 1px solid #b5e4ff;
  cursor: pointer;
  font-size: 14px;
}

div.gallery-item {
  margin: 5px;
  border: 1px solid #ccc;
  width: 40%;
  min-width: 220px;
}

div.gallery-item:hover {
  border: 1px solid #777;
}

div.gallery-item img {
  width: 100%;
  height: 300px;
}

div.gallery-item div.desc {
  padding: 15px;
  text-align: center;
}

.quem-somos {
  position: relative;
  background-color: lightgray;
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  width: 50%;
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

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

h3,
p {
  color: rgb(46, 46, 46);
  text-align: center;
  font-size: large;
}

/*  FEEDBACK PROFISSIONAL (AQUI NO FINAL) */
.feedback-container {
  background: linear-gradient(135deg, #f5f5f5, #eaeaea);
  padding: 60px 20px;
  text-align: center;
}

.titulo-feedback {
  font-size: 30px;
  margin-bottom: 40px;
  color: #333;
}

.feedbacks {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.feedback {
  background: white;
  padding: 25px;
  width: 260px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.feedback:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.feedback p {
  font-style: italic;
  margin: 15px 0;
  display: block;
  color: #555;
}

.feedback h4 {
  margin-top: 10px;
  color: #222;
}

.stars {
  color: gold;
  font-size: 18px;
}

@media (max-width: 1200px) {
  .contato {
    width: 100%;
  }

  div.gallery {
    flex-direction: row;
  }

  div.gallery-item {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .contato {
    width: 100%;
  }

  div.gallery {
    flex-direction: column;
  }

  div.gallery-item {
    width: 80%;
  }

  @media (max-width: 768px) {
    div.gallery-item {
      width: 100%;
    }
  }
}
</style>
