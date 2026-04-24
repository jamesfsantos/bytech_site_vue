<template>
    <main class="main-revisao">

        <div class="rev-background">
            <h1 class="h1-rev">Revisao do Pedido</h1><br>

            <div class="rev-grid">


                <div class="inf-nf">
                    <h2>Informações na nota fiscal do pedido:</h2>
                    <p>Nome:</p>
                    <p>CPF:</p>
                    <P>E-Mail:</P>
                    <p>Celular:</p>
                </div>

                <div class="end-envio">
                    <h2>Seu pedido será entregue em:</h2>
                    <p>Endereço:</p>
                    <p>Complemento:</p>
                    <p>Cidade:</p>
                    <p>CEP:</p>
                </div>

                <div class="rev-produto">
                    <h2>Produtos:</h2>

                </div>

                <div class="forma-pagamento">
                    <h2>Forma de pagamento:</h2>
                    <p></p>
                </div>

                <div class="resumo-compra">
                    <h2>Resumo do pedido:</h2><br>
                    <p>Valor dos produtos:</p><br>
                    <p>Descontos:</p><br>
                    <p>Frete:</p><br>
                    <h2>Total:</h2><br>
                    <p>Deseja finalizar a compra ?</p><br>

                    <div class="btn-finalizar-div">
                        <a href="concluido.html"><button class="btn-finalizar-compra">Finalizar Compra</button></a>
                        <a href="Pagamento.html"><button class="btn-voltar-compra">Voltar</button></a>
                    </div>

                </div>



            </div>
        </div>
    </main>
</template>

<style scoped>
.main-revisao {
    background-color: #353535;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    min-height: 100vh;
    /* padding: 20px; */
    justify-content: center;
    align-content: center;
}

.rev-background {

    background-color: lightgray;
    padding-bottom: 20px;
    width: 100%;

}

.h1-rev {
    background-color: #3B8CBE;
    color: rgb(255, 255, 255);
    width: 100%;
    text-align: center;
}

.rev-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    max-width: 90%;
    margin: auto;
}


.rev-grid h2 {
    background-color: #3B8CBE;
    color: rgb(255, 255, 255);
    width: 100%;
    text-align: center;

}

/* cards padrão */
.rev-grid>div {
    border: 1px solid #7e9aab;
    border-radius: 5px;
    background-color: lightgray;
    /* padding: 15px; */
    min-height: 90px;
    /* para garantir que os cards tenham uma altura mínima consistente */
}

/* TOPO - ocupa tudo */
.inf-nf {
    grid-column: 1 / 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    display: flex;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    flex-wrap: nowrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: flex-start;
}

/* endereço (esquerda) */
.end-envio {
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: flex-start;
}

/* produtos ocupa esquerda inteira */
.rev-produto {
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
}

/* forma pagamento esquerda */
.forma-pagamento {
    grid-column: 1 / 2;
}

/* botão finalizar esquerda */
.btn-finalizar-div {
    grid-column: 1 / 3;
    display: flex;
    justify-content: center;
    max-width: 500px;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    gap: 10px;

}

/* SIDEBAR (igual Kabum) */
.resumo-compra {
    grid-column: 2 / 3;
    grid-row: 1 / 6;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
}

.btn-finalizar-compra {
    width: 200px;
    background-color: #006E1D;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.btn-voltar-compra {

    width: 200px;
    background-color: #3B8CBE;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

}


.btn-finalizar-compra:hover {
    background-color: #96E4FD;
}

@media only screen and (max-width: 600px) {
    .rev-grid {
        grid-template-columns: 1fr;
    }

    .resumo-compra {
        grid-column: 1 / 2;
        grid-row: 6 / 7;
    }

    .btn-finalizar-div {
        grid-column: 1 / 2;
    }
}
</style>