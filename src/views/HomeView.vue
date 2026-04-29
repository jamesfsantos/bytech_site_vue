

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
          <button>Saiba mais</button>
        </router-link>
      </div>

      <div class="coluna">
        <router-link to="/produtos/categoria/computadores">
          <img class="imagens" src="@/assets/images/pc-gamer-completo-preto.jpg" alt="PC Gamer" />
        </router-link>
        <h2>PC Gamer</h2>
        <p>
          PCs gamer montados com as melhores peças do mercado, desde a entrada ao high-end extremo.
        </p>
        <router-link to="/produtos/categoria/computadores">
          <button>Saiba mais</button>
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
          <button>Saiba mais</button>
        </router-link>
      </div>
    </div>
  </main>
</template>
