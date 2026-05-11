<template>
  <main class="sobre-page">
    <section class="quem-somos">
      <div class="titulo">
        <h1>Sobre a ByTech</h1>
        <p>
          Tecnologia, desempenho e confiança para elevar sua experiência.
        </p>
      </div>

      <div class="card">
        <h2>Quem somos</h2>
        <p>
          Somos uma loja especializada em equipamentos de informática e
          tecnologia, oferecendo produtos e serviços de qualidade para atender
          às necessidades dos nossos clientes.
        </p>
      </div>

      <div class="grid">
        <div class="card">
          <h2>Missão</h2>
          <p>
            Entregar o melhor em computadores, videogames e periféricos,
            atendendo às necessidades de cada cliente com qualidade,
            desempenho e eficiência.
          </p>
        </div>

        <div class="card">
          <h2>Visão</h2>
          <p>
            Ser referência em montagem de computadores e manutenção,
            reconhecida pela qualidade, confiabilidade e impacto positivo
            em nossos clientes.
          </p>
        </div>
      </div>

      <div class="card">
        <h2>Valores</h2>

        <div class="valores">
          <span>Qualidade</span>
          <span>Inovação</span>
          <span>Compromisso</span>
          <span>Transparência</span>
          <span>Excelência</span>
        </div>
      </div>

      <div class="contato">
        <h2>Canais de atendimento</h2>

        <div class="contato-grid">
          <a href="#">
            <i class="fa-brands fa-whatsapp"></i>
            <span>(11) 99999-9999</span>
          </a>

          <a href="#">
            <i class="fa-solid fa-phone-volume"></i>
            <span>(11) 3999-9999</span>
          </a>

          <a href="#">
            <i class="fa-solid fa-envelope"></i>
            <span>Bytech.Senac@Email.com.br</span>
          </a>

          <a href="#">
            <i class="fa-regular fa-comments"></i>
            <span>Chatbot</span>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sobre-page {
  min-height: 100vh;

  padding: 40px 20px;

  background: linear-gradient(to bottom, #f4f8fb, #e8f1f7);

  display: flex;
  justify-content: center;
}

.quem-somos {
  width: 100%;
  max-width: 1200px;

  display: flex;
  flex-direction: column;
  gap: 25px;
}

.titulo {
  text-align: center;

  padding: 40px 20px;

  border-radius: 24px;

  background: linear-gradient(135deg, #005373, #3b8cbe);

  color: white;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.titulo h1 {
  font-size: 42px;
  margin-bottom: 10px;
}

.titulo p {
  font-size: 18px;
  opacity: 0.95;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.card {
  background: white;

  border-radius: 22px;

  padding: 30px;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);

  transition: 0.25s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card h2 {
  color: #005373;

  margin-bottom: 15px;

  font-size: 28px;
}

.card p {
  color: #444;

  line-height: 1.7;

  font-size: 16px;
}

.valores {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.valores span {
  background: #005373;

  color: white;

  padding: 10px 18px;

  border-radius: 999px;

  font-weight: bold;

  font-size: 14px;
}

.contato {
  background: white;

  border-radius: 22px;

  padding: 30px;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.contato h2 {
  color: #005373;

  margin-bottom: 25px;

  text-align: center;

  font-size: 30px;
}

.contato-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.contato-grid a {
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 18px;

  border-radius: 18px;

  background: #f4f8fb;

  text-decoration: none;

  color: #005373;

  font-weight: bold;

  transition: 0.2s ease;
}

.contato-grid a:hover {
  background: #005373;
  color: white;

  transform: scale(1.02);
}

.contato-grid i {
  font-size: 26px;
}

@media (max-width: 768px) {
  .titulo h1 {
    font-size: 30px;
  }

  .titulo p {
    font-size: 15px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .contato-grid {
    grid-template-columns: 1fr;
  }

  .card,
  .contato {
    padding: 22px;
  }
}
</style>
