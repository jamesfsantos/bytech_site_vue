<template>
  <main>
    <div class="Carrinho">
      <h1>Seu Carrinho</h1>
      <p class="item">Itens adicionados ao carrinho:</p>

      <div class="Resumo">
        <span>
          <img src="@/assets/images/ps5pro.jpg" alt="PS5 Pro" />

          <label for="Quantidade">Quantidade:</label>

          <select id="Quantidade" name="Quantidade">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <br />
          <p class="preco">Preco: R$ 5999,00</p>
          <button class="btn-Remover-Carrinho">X</button>
        </span>
      </div>
      <p class="Limpar-Carrinho">Limpar carrinho <button class="btn-Remover-Carrinho">X</button></p>

      <h2>Entrega</h2>
      <div class="frete">
        <form>
          <input
            type="text"
            id="CEP"
            name="CEP"
            placeholder="Insira seu CEP"
            class="input-cep"
          /><br />
        </form>
        <button class="btnFrete">Calcular o frete</button>
      </div>

      <h2>Resumo do Pedido</h2>
      <div class="Total">
        <p class="Valor-Itens">Total dos Itens: R$ 0,00</p>
        <p class="Valor-Frete">Frete: R$ 0,00</p>
        <p class="Valor-Total-Compra">Total: R$ 0,00</p>

        <a href="Pagamento.html" class="btnfinalizar">Finalizar Compra</a>
      </div>
    </div>
  </main>
</template>

<style scoped>
div.Carrinho {
  border: 1px solid #3b8cbe;
  /* border-bottom: 28px solid #3b8cbe; */
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 80%;
  padding: 0px 0px;
  flex-wrap: wrap;
  align-content: center;
}

div.Carrinho img {
  height: 60px;
  width: 60px;
  border: 1px solid gray;
}

div.Carrinho h1,
h2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #3b8cbe;
  width: 100%;
  color: #ececec;
}

a.btnfinalizar,
button.btnFrete {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  min-height: 40px;
  background-color: #006e1d;
  height: 40px;
  width: 150px;
}

button.btnFrete {
  background-color: #3b8cbe;
}

button.btn-Remover-Carrinho {
  width: 16px;
  height: 16px;
  background-color: transparent;
  color: rgb(255, 0, 0);
  border: 1px solid rgb(255, 0, 0);
}

button.btn-Remover-Carrinho:hover {
  background-color: rgb(255, 0, 0);
  color: white;
}

.Limpar-Carrinho {
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

div.Resumo span {
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-right: 20px;
  flex-wrap: nowrap;
  width: auto;
  align-content: center;
  border: 1px solid #3b8cbe;
}

div.Total {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0px;
  width: 80%;
}

.Valor-Total-Compra {
  font-size: 20px;
  font-weight: bold;
}

div.frete {
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0px;
}

.input-cep {
  border: 0;
  border-radius: 5px;
  align-items: center;
  text-align: center;
  height: 40px;
}

@media (max-width: 900px) {
  div.frete {
    flex-direction: column;
  }
}
</style>
