import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Contato from '@/views/ContatoView.vue'
import Servico from '@/views/ServicoView.vue'
import Login from '@/views/Login/LoginView.vue'
import Cadastro from '@/views/Login/CadastroView.vue'
import Carrinho from '@/views/Carrinho/CarrinhoView.vue'
import Produto from '@/views/Produto/ProdutoView.vue'
import ProdutosCategorias from '@/views/Produto/ProdutoCategoriasView.vue'

const routes = [
  {path: '/', name: 'home',component: Home },
  {path: '/contato', name: 'contato',component: Contato },
  {path: '/servicos', name: 'servicos',component: Servico },
  {path: '/login', name: 'login',component: Login },
  {path: '/cadastro', name: 'cadastro',component: Cadastro },
  {path: '/carrinho', name: 'carrinho',component: Carrinho },
  {path: '/produto', name: 'produto',component: Produto },
  {path: '/produtos/categoria/:categoriaId', name: 'produtos',component: ProdutosCategorias },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
