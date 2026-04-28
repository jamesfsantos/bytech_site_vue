<script setup>





</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar vh-100 p-0 border-end">
        <div class="p-4">
          <div class="logo-img">
            <img  src="@/assets/images/logo/bytech_logo.svg" >
          </div>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <RouterLink class="nav-link mb-2" to="/manager/produto" >
                Produto
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>

      <nav class="navbar navbar-light bg-light d-md-none p-3">
        <div class="logo-img">
            <img  src="@/assets/images/logo/bytech_logo.svg" >
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobileMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mobileMenu">
          <ul class="navbar-nav pt-2">
            <RouterLink class="nav-link mb-2" to="/manager/produto" >
                Produto
            </RouterLink>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-light">
          <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>

* {
  font-size: 16px;
}
main {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.sidebar {
  background-color: #f1f1f1 !important;
}

/* Simula o visual do 'well' do Bootstrap 3 usando cards do BS5 */
.card {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
}

/* Ajuste para o item de menu ativo */
.nav-pills .nav-link.active {
  background-color: #337ab7; /* Azul clássico do BS3 */
}

.nav-link {
  color: #337ab7;
}


.logo-img img {
    position: relative;
    height: 120px;
    width: 190px;
    flex: 1;
}

.logo-img img:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
}
</style>
