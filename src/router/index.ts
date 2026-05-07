import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Contato from '@/views/ContatoView.vue'
import Servico from '@/views/ServicoView.vue'
import Login from '@/views/Login/LoginView.vue'
import Cadastro from '@/views/Login/CadastroView.vue'
import Carrinho from '@/views/Carrinho/CarrinhoView.vue'
import Produto from '@/views/Produto/ProdutoView.vue'
import Pagamento from '@/views/Pagamento/PagamentoView.vue'
import ProdutosCategorias from '@/views/Produto/ProdutoCategoriasView.vue'
import RevisaoPagamento from '@/views/Pagamento/RevisaoPagamentoView.vue'
import ManagerLayout from '@/layout/ManagerLayout.vue'
import ProdutoDashBoard from '@/views/Manager/ProdutoDashBoardView.vue'
import LayoutPadrao from '@/layout/LayoutPadrao.vue'
import CadastroProduto from '@/views/Manager/CadastroProdutoDashBoardView.vue'
import ListaPedidos from '@/views/ListaPedidosView.vue'
import QuemSomos from '@/views/QuemSomosView.vue'


const routes = [
  {
    path: '/',
    component: LayoutPadrao,
    children: [
      {path: '/', name: 'home',component: Home },
      {path: '/quem-somos', name:'quemSomos', component: QuemSomos},
      {path: '/pedidos', name: 'lista',component: ListaPedidos },
      {path: '/contato', name: 'contato',component: Contato },
      {path: '/servicos', name: 'servicos',component: Servico },
      {path: '/login', name: 'login',component: Login },
      {path: '/cadastro', name: 'cadastro',component: Cadastro },
      {path: '/pagamento/:id', name: 'pagamento', component: Pagamento},
      {path: '/revisao-pagamento', name: 'revisao', component: RevisaoPagamento},
      {path: '/carrinho/', name: 'carrinhoPrincipal',component: Carrinho },
      {path: '/carrinho/:produtoId', name: 'carrinho',component: Carrinho },
      {path: '/produtos/categoria/:categoriaId', name: 'produtos',component: ProdutosCategorias },
      {path: '/produto/:produtoId', name: 'produto', component: Produto }
    ]
  },

  {
    path: '/manager',
    component: ManagerLayout,
    children: [
      {
        path: '/manager/produto',
        component: ProdutoDashBoard
      },
      {
        path: '/manager/produto/cadastro',
        component: CadastroProduto
      },
      {
        path: '/manager/produto/editar/:id',
        component: CadastroProduto
      },
      {
        path: '/manager/produto/deletar/:id',
        component: ProdutoDashBoard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
