<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';


</script>



<template>

  <main>
    <div class="carrousel-div">
    <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/images/PC-gamer-1024.png" class="d-block w-100 h-100" style="object-fit: cover;" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/consoles-pcs-img.jpg" class="d-block w-100 h-100" style="object-fit: cover;" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/ps5proprom.png" class="d-block w-100 h-100" style="object-fit: cover;" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
</div>
<br>

    <div class="conteudo">
      <div class="coluna">
        <router-link to="/produtos/categoria/video-games">
          <img
            class="imagens"
            src="@/assets/images/capa-consoles-1513704274993_v2_1920x1080.jpg"
            alt="Videogames"
          />
        </router-link>
        <h2>Videogames</h2>
        <p>
          PlayStation, Xbox, Nintendo e muito mais. Novos e seminovos com garantia e procedência
          assegurada.
        </p>
        <router-link to="/produtos/categoria/video-games">
          <button>Saiba mais 👈</button>
        </router-link>
      </div>

      <div class="coluna">
        <router-link to="/produtos/categoria/computadores">
          <img class="imagens" src="@/assets/images/pc-gamer-completo-preto.jpg" alt="PC Gamer" />
        </router-link>
        <h2>Computadores</h2>
        <p>
          PCs gamer montados com as melhores peças do mercado, desde a entrada ao high-end extremo.
        </p>
        <router-link to="/produtos/categoria/computadores">
          <button>Saiba mais 👈</button>
        </router-link>
      </div>

      <div class="coluna">
        <router-link to="/servicos">
          <img class="imagens" src="@/assets/images/playstation-5-612x612.webp" alt="Manutenção" />
        </router-link>
        <h2>Conserto e manutenção</h2>
        <p>
          Reparo, limpeza e manutenção preventiva/corretiva de PCs, Notebooks e consoles.
        </p>
        <router-link to="/servicos">
          <button>Saiba mais 👈</button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>



main {
  min-height: 100vh;

  background: #f4f8fb;

  padding: 40px 20px;

  display: flex;
  flex-direction: column;

  gap: 50px;
}



.carrousel-div {
  width: 100%;
  max-width: 1500px;

  margin: auto;

  overflow: hidden;

  border-radius: 24px;

  box-shadow: 0 10px 30px rgba(0, 83, 115, 0.12);
}

.carousel-item img {
  height: 550px;

  object-fit: cover;
}



.conteudo {
  width: 100%;
  max-width: 1600px;

  margin: auto;

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  gap: 30px;
}

.coluna {
  background: white;

  border-radius: 24px;

  padding: 28px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 22px;

  transition: .25s ease;

  box-shadow: 0 8px 20px rgba(0, 83, 115, 0.08);

  border: 1px solid #dcecf3;
}

.coluna:hover {
  transform: translateY(-8px);

  box-shadow: 0 18px 35px rgba(0, 83, 115, 0.14);
}



.coluna .imagens {
  width: 100%;
  max-width: 320px;

  height: 240px;

  object-fit: cover;

  border-radius: 18px;

  transition: .25s ease;
}

.coluna:hover .imagens {
  transform: scale(1.02);
}



.coluna h2 {
  color: #005373;

  font-size: 1.5rem;

  text-align: center;
}

.coluna p {
  color: #5d6b75;

  line-height: 1.7;

  text-align: center;

  font-size: 1rem;
}


.coluna button,
.btn-feedback {
  height: 48px;

  padding: 0 28px;

  border: none;

  border-radius: 14px;

  background: #005373;

  color: white;

  font-weight: bold;

  cursor: pointer;

  transition: .2s ease;
}

.coluna button:hover,
.btn-feedback:hover {
  background: #0a6b92;

  transform: translateY(-2px);
}

.coluna a {
  text-decoration: none;
}

/* =========================
   RESPONSIVO
========================= */

@media (max-width: 900px) {

  .carrousel-div {
    border-radius: 18px;
  }

  .carousel-item img {
    height: 300px;
  }

  .conteudo {
    grid-template-columns: 1fr;
  }

  .coluna {
    padding: 22px;
  }

  .coluna .imagens {
    height: 220px;
  }

}

@media (max-width: 600px) {

  main {
    padding: 20px 15px;
  }

  .carousel-item img {
    height: 220px;
  }

  .coluna h2 {
    font-size: 1.3rem;
  }

  .coluna p {
    font-size: .95rem;
  }

  .coluna button {
    width: 100%;
  }

}

</style>
