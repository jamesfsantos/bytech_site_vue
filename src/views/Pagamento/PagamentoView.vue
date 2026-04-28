<template>
    <main class="Main-pagamento">
        <div class="pagamento">
            <h1>Escolha o metodo de pagamento</h1>

            <div class="pagamento-pix">
                <div>
                    <input type="radio" id="pix" name="pagamento" value="pix" class="input-radio">
                    <label for="pix"><span> PIX </span></label>
                </div> <div class="logo">
                    <img src="@/assets/images/Icones/pix.svg" alt="pix">
                </div>
            </div>

            <div class="pagamento-pix"> <div>
                    <input type="radio" id="cartao" name="pagamento" value="cartao" class="input-radio">
                    <label for="cartao"><span> Cartão </span></label>
                </div> <div class="logo">
                    <img src="@/assets/images/Icones/credit-card-regular-full.svg" alt="cartão">
                </div>
            </div>

            <div class="pagamento-cartao-formulario">
                <form>
                    <fieldset>
                        <legend>Cartão de Credito/Débito</legend>
                        <p>Até 12x sem juros.</p>

                        <div class="campo">
                            <input type="text" id="num-cartao" placeholder="Numero do cartão" required>
                        </div>

                        <div class="campo">
                            <input type="text" id="nome-cartao" placeholder="Nome impresso no cartão" required>
                        </div>

                        <div class="campo">
                            <input type="text" id="validade-cartao" placeholder="Validade" required>
                        </div>

                        <div class="campo">
                            <input type="text" id="cod-segurança-cartao" placeholder="Codigo de segurança" required>
                        </div>

                        <div class="campo">
                            <input type="text" id="cpf" placeholder="CPF" pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}" required>
                        </div>

                        <br>

                        <label for="parcelas">
                            <p> Numero de parcelas:</p>
                        </label>

                        <select id="parcelas" name="parcelas" required>
                            <option value="1">1x a Vista</option>
                            </select>

                        <input type="submit" value="confirmar" class="btn-confirmar">
                    </fieldset>
                </form>
            </div>
        </div>

        <div class="resumo-pedido">
            <h2>Resumo do pedido</h2>
            <p>Valor dos produtos: R$ </p>
            <p>Frete: R$ </p>
            <h2>Total: R$ </h2>

            
        </div>
    </main>
</template>

<style scoped>
.Main-pagamento {
    display: flex;
    gap: 20px;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
}


.pagamento {
    /* background-color: lightgrey;
    border: 1px solid #3b8cbe;
    font-size: bold;
    font-size: 1rem;
    width: 70%; */
    display: flex;
    background-color: lightgrey;
    border: 1px solid #3b8cbe;
    font-weight: bold;
    font-size: 1rem;
    width: 60%;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 20px;
    padding: 50px;
    align-items: center;


}

.pagamento h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}

.input-radio {
    position: relative;
    top: 10px;
    height: 20px;
    left: 10px;
    width: 20px;
}

.pagamento-pix {
    display: flex;
    background-color: #3b8cbe;
    /* border: 2px solid #3b8cbe; */
    border-radius: 5px;
    padding: 5px;
    /* height: 50px; */
    width: 90%;
    align-items: flex-start;
    justify-content: space-between;
    align-content: center;
    flex-wrap: nowrap;

}

.pagamento-pix span {
    color: white;
    position: relative;
    top: 6px;
    left: 15px;
}

.pagamento-pix img {
    width: 40px;
    height: auto;
}

.pagamento-cartao {
    display: block;
    background-color: #3b8cbe;
    /* border: 2px solid #3b8cbe; */
    border-radius: 5px;
    padding: 5px;
    /* height: 50px; */
    width: 90%;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: nowrap;
}

.pagamento-cartao p {
    color: white;
    font-size: 1rem;
    /* border-top: 1px solid #3b8cbe; */
}

.pagamento-cartao span {
    color: white;
    position: relative;
    top: 6px;
    left: 15px;
}

.pagamento-cartao-formulario {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0px;
    width: 100%;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
}

fieldset {
    border: 1px solid #3b8cbe;
    display: flex;
    gap: 20px;
    padding: 20px 0px;
    text-align: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
}

.pagamento-cartao-formulario input {
    /* height: 2rem; */
    width: 50%;
    padding: 0.6rem;
    border: 2px solid #3b8cbe;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn-confirmar {
    width: 50%;
    background-color: #3b8cbe;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.btn-confirmar:hover {
    background-color: #96E4FD;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    text-align: center;
    width: 100%;
}

.resumo-pedido {
    display: flex;
    background-color: lightgrey;
    border: 1px solid #3b8cbe;
    font-weight: bold;
    font-size: 1rem;
    width: 20%;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 20px;
    align-items: center;
    padding-bottom: 20px;
    color: white;
}

.resumo-pedido h2 {
    background-color: #3b8cbe;
    font-weight: bold;
    text-align: center;
    width: 100%;
}

.btn-fechar-pedido {
    width: 200px;
    background-color: #006E1D;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.btn-fechar-pedido:hover {
    background-color: #96E4FD;
}

@media (max-width: 1440px) {

    .pagamento {
        width: 90%;

    }

    .resumo-pedido {
        width: 30%;
    }

    .pagamento-pix p {
        display: none;
    }

}

@media (max-width: 768px) {

    .Main-pagamento {
        flex-direction: column;
    }

    .pagamento {
        width: 100%;

    }

    .resumo-pedido {
        width: 100%;
    }

    .pagamento-pix p {
        display: none;
    }

}
</style>