<template>
  <main>
    <div class="Login">
      <h1>Acesse sua conta</h1>
      <p>informe seus dados para continuar</p>
      <br />

      <label for="email">E-mail:</label>
      <input type="email" id="email" name="email" placeholder="Insira seu E-mail" /><br />

      <label for="senha">Senha:</label>
      <input type="password" id="senha" name="senha" placeholder="Insira sua Senha" /><br />

      <button class="btnAcessar">Acessar Conta</button><br />

      <p class="esqSenha">Esqueceu sua senha?</p>
      <br />
    </div>

    <div class="Nova-Conta">
      <h2>Criar sua conta</h2>
      <br />
      <p>Clique no botão abaixo para criar sua conta:</p>
      <br />

      <RouterLink to="/cadastro"><button class="btnCriar">Criar Conta</button></RouterLink><br>
    </div>
  </main>
</template>
<style scoped>
  div.Login h1 {
    align-items: center;
    text-align: center;
    background-color: #3B8CBE;
    color: white;
    width: 100%;
}

div.Login {
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: #D3D3D3;
    font-size: 1rem;
    /* padding: 50px; */
    border: 1px solid #3b8cbe;
    width: 50%;
}

div.Login label {
    font-weight: bold;
}

div.Login input {
    height: 2rem;
    width: 50%;
    padding: 0.6rem;
    border: 2px solid #3b8cbe;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}


div.Login input:focus {

    border: 3px solid #96E4FD;

}

div.Login button.btnAcessar,
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

div.Nova-Conta a, a:visited{
    text-decoration: none;
    color: white;
}

div.Login button.btnAcessar:hover {
    background-color: #005373;
    border: 1px solid #0681c9;
}

div.Nova-Conta button:hover {
    background-color: #005373;
    border: 1px solid #0681c9;
}

div.Login .esqSenha {
    font-size: 14px;
    text-decoration: underline;
}

div.Login .esqSenha:hover {
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
</style>
