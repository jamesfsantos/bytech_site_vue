import { ref } from "vue";

const usuarioEmail = ref(localStorage.getItem('user_email') || '')
const estaLogado = ref(!!localStorage.getItem('user_token'))
const usuarioNome = ref(localStorage.getItem('user_nome') || '')

export function useAuth(){
  // getItem busca os dados que estão armazenados na localStorage...
  const atualizarUsuario = () => {
    usuarioNome.value = localStorage.getItem('user_nome') || ''
    usuarioEmail.value = localStorage.getItem('user_email') || ''
    estaLogado.value = !!localStorage.getItem('user_token')
  }

  // removeItem como o nome é bem sugestivo ele removerá as variaveis do localStorage...
  const logout = () => {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_nome')
    localStorage.removeItem('user_email')
    usuarioEmail.value = ''
    estaLogado.value = false
  }

  return{
    usuarioNome,
    usuarioEmail,
    estaLogado,
    atualizarUsuario,
    logout
  }
}
