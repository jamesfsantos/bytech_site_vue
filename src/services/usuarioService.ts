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

  async buscarUsuario(email: string): Promise<UsuarioModel>{
    try{
      const response = await api.get(`/email/${email}`)
      return response.data;
    }
    catch(erro: unknown){
      console.error("Erro ao buscar usuario: ", erro)
      throw erro
    }
  }

  async atualizarUsuario(id: number, dados: UsuarioModel): Promise<boolean>{
    try{
      const response = await api.put(`/Usuarios/${id}`, dados)

      return response.status >= 200 && response.status < 300;
    }
    catch(error)
    {
      console.error("Erro ao atualizar usuario:", error);
      return false;
    }
  }
}

export default new UsuarioService()
