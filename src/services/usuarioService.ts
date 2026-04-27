import api from '@/api/api'
import type { UsuarioModel } from '@/models/usuarioModel'

class UsuarioService {
  async cadastrarUsuario(dados: Omit<UsuarioModel, 'id'>): Promise<boolean> {
    try {
      const response = await api.post(`/Usuarios`, dados)

      return response.status === 201 || response.status === 200
    } catch (erro: unknown) {
      console.log(erro)
      return false
    }
  }


}

export default new UsuarioService()
