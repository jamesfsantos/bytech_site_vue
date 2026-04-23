<script lang="ts" setup>
import { ref } from 'vue';


</script>

<template>
  <main>
    <div class="Criar-Conta">
      <h1>Criar Conta</h1>
      <br />
      <p>informe seus dados para continuar a criação da conta</p>
      <br />

      <form action="post">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <label for="nome">Nome:</label><br />
          <input type="text" id="nome" name="nome" placeholder="Insira seu nome" required /><br />

          <label for="sobrenome">Sobrenome:</label><br />
          <input
            type="text"
            id="sobrenome"
            name="sobrenome"
            placeholder="Insira seu sobrenome"
            required
          /><br />

          <label for="datanasc">Data de nascimento:</label><br />
          <input type="date" id="datanasc" name="datanasc" required /><br /><br />

          <label for="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Insira seu E-mail"
            required
          /><br />

          <label for="email-confirma">Confirme seu E-mail:</label>
          <input
            type="email"
            id="email-confirma"
            name="email-confirma"
            placeholder="Confirme seu E-mail"
            required
          /><br />

          <label for="cel">Celular:</label><br />
          <input
            type="tel"
            id="cel"
            name="cel"
            placeholder="xxxxx-xxxx"
            pattern="[0-9]{5}-[0-9]{4}"
            required
          /><br />

          <label for="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="xxx.xxx.xxx-xx"
            pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"
            required
          /><br />

          <label for="senha">Senha:</label>
          <input type="password" id="senha" name="senha" placeholder="Insira sua Senha" /><br />

          <label for="senha-confirma">Confirme sua Senha:</label>
          <input
            type="password"
            id="senha-confirma"
            name="senha-confirma"
            placeholder="Confirme sua Senha"
          /><br />

          <input type="submit" class="btnAcessar" value="Criar Conta" />
        </fieldset>
      </form>

      <p class="esqSenha">Esqueceu sua senha?</p>
      <br />
    </div>

  </main>
</template>
<style scoped>
  div.Criar-Conta h1 {
    align-items: center;
    text-align: center;
    background-color: #3B8CBE;
    color: white;
    width: 100%;
}

div.Criar-Conta {
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: #D3D3D3;
    font-size: 1rem;
    /* padding: 50px; */
    border: 1px solid #3b8cbe;
    width: 70%;
}

div.Criar-Conta fieldset {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 80%;
    padding: 50px 0;
}

div.Criar-Conta form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 80%;
}



div.Criar-Conta label {
    font-weight: bold;
}

div.Criar-Conta input {
    height: 2rem;
    width: 50%;
    padding: 0.6rem;
    border: 2px solid #3b8cbe;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}


div.Criar-Conta input:focus {

    border: 3px solid #96E4FD;

}

fieldset .btnAcessar,
div.Nova-Conta button {

    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: #3b8cbe;
    border: none;
    border-radius: 10px;
    height: 40px;
    width: fit-content;
    color: white;
    font-weight: bold;
    cursor: pointer;
    min-height: 40px;
    text-transform: uppercase;
    padding: 10px;

}

div.Criar-Conta fieldset .btnAcessar:hover {
    background-color: #005373;
    border: 1px solid #0681c9;
}

div.Nova-Conta button:hover {
    background-color: #005373;
    border: 1px solid #0681c9;
}

div.Criar-Conta .esqSenha {
    font-size: 14px;
    text-decoration: underline;
}

div.Criar-Conta .esqSenha:hover {
    color: #3b8cbe;
    cursor: pointer;
}

div.Nova-Conta {
    display: flex;
    flex-direction: column;
    background-color: #D3D3D3;
    font-size: 1rem;
    /* padding: 50px; */
    border: 1px solid #3b8cbe;
    width: 50%;
}

div.Nova-Conta h2 {
 align-items: center;
    text-align: center;
    background-color: #3B8CBE;
    color: white;
    width: 100%;
}

div.Nova-Conta p {
    align-items: center;
    text-align: center;
    font-size: 14px;
}

@media (max-width: 900px) {
    div.Criar-Conta {
        width: 90%;
    }

    div.Criar-Conta input {
        width: 80%;
    }

    div.Nova-Conta {
        width: 90%;
    }
}
</style>
