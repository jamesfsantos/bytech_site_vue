import api from "@/api/api";
import type { UsuarioModel } from "@/models/usuarioModel";

class UsuarioService {
  async cadastrarUsuario(dados: Omit<UsuarioModel, "id">): Promise<boolean> {
    try {
      const response = await api.post(`/Usuarios`, dados);

      return response.status === 201 || response.status === 200;
    } catch (error: unknown) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    }
  }

  async buscarUsuario(email: string): Promise<UsuarioModel> {
    try {
      const response = await api.get(`/email/${email}`);
      return response.data;
    } catch (error: unknown) {
      const mensagemErro = error.response?.data?.message || "Erro inesperado ao buscar Usuario.";
      throw new Error(mensagemErro);
    }
  }

  async atualizarUsuario(id: number, dados: UsuarioModel): Promise<boolean> {
    try {
      const response = await api.put(`/Usuarios/${id}`, dados);

      return response.status >= 200 && response.status < 300;
    } catch (error: unknown) {
      const mensagemErro =
        error.response?.data?.message || "Erro inesperado ao Atualizar o Usuario.";
      throw new Error(mensagemErro);
    }
  }
}

export default new UsuarioService();
