<template>
  <main>
    <div class="conteudo">
      <div class="contato">
        <h2>Serviços</h2>

        <h3>Reparo e Manutenção</h3>

        <p class="intro">
          Qualidade, confiança e agilidade na manutenção do seu videogame. Seu console em boas mãos.
        </p>

        <p>
          Nossa equipe técnica cuida do seu console ou PC com diagnóstico completo, peças originais
          e garantia no serviço.
        </p>

        <h3>Serviços de manutenção</h3>

        <br />

        <div class="gallery">
          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/pcfix.jpg">
              <img src="@/assets/images/pcfix.jpg" />
            </a>
            <div class="desc">Manutenção para qualquer problema no PC</div>
            <button>Agende(Em breve)</button>
          </div>

          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/play.jpg">
              <img src="@/assets/images/ps5.jpg" />
            </a>
            <div class="desc">Manutenção para Playstation</div>
            <button>Agende(Em breve)</button>
          </div>

          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/xbox.jpg">
              <img src="@/assets/images/xbox.jpg" />
            </a>
            <div class="desc">Manutenção para Xbox</div>
            <button>Agende(Em breve)</button>
          </div>

          <div class="gallery-item">
            <a target="_blank" href="@/assets/images/nintendo.jpg">
              <img src="@/assets/images/nintendo.jpg" />
            </a>
            <div class="desc">Manutenção para Nintendo</div>
            <button disabled>Agende(Em breve)</button>
          </div>
        </div>

        <br />


      </div>
      <!-- fecha contato -->
    </div>
    <!-- fecha conteudo -->
  </main>
</template>

<style scoped>
/* =========================
   BASE
========================= */

main {
  min-height: 100vh;
  background: #f4f8fb;
  padding: 50px 20px;
  display: flex;
  justify-content: center;
}

/* =========================
   CONTAINER PRINCIPAL
========================= */

.conteudo {
  width: 100%;
  max-width: 1200px;
}

.contato {
  background: white;
  border: 1px solid #dcecf3;
  border-radius: 28px;
  padding: 35px;
  box-shadow: 0 8px 24px rgba(0, 83, 115, 0.08);

  text-align: center;
}

.contato {
  text-align: left;
}

.contato h2 {
  text-align: center;
}

.contato h3 {
  margin-top: 20px;
  color: #0a6b92;
  text-align: left;
}

.contato p {
  text-align: left;
  line-height: 1.7;
  color: #5d6b75;
}

.intro {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d2d2d;
}

/* =========================
   GALERIA
========================= */

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

/* CARD */
.gallery-item {
  background: white;
  border: 1px solid #dcecf3;
  border-radius: 18px;
  overflow: hidden;

  box-shadow: 0 6px 18px rgba(0, 83, 115, 0.08);

  transition: 0.25s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 30px rgba(0, 83, 115, 0.15);
  border-color: #3b8cbe;
}

/* IMAGEM */
.gallery-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* DESCRIÇÃO */
.desc {
  padding: 15px;
  font-size: 0.95rem;
  color: #2d2d2d;
  text-align: center;
}

/* BOTÃO */
.gallery-item button {
  margin-bottom: 18px;

  background: #005373;
  border: none;

  border-radius: 14px;

  padding: 10px 18px;

  color: white;
  font-weight: bold;

  cursor: pointer;

  transition: 0.2s ease;
}

.gallery-item button:hover {
  background: #0a6b92;
  transform: translateY(-2px);
}

/* =========================
   CANAIS
========================= */

.contato i {
  font-size: 2.2rem;
  color: #3b8cbe;
  margin: 15px;
  transition: 0.2s ease;
}

.contato i:hover {
  transform: scale(1.1);
  color: #0a6b92;
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

  .gallery {
    grid-template-columns: 1fr;
  }
}
</style>
