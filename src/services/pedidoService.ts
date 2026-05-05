import api from "@/api/api";
import type { PedidoModel } from "@/models/pedidoModel";

class PedidoService {
  async criarPedido(dados: PedidoModel): Promise<boolean>{
    try{
      const response = await api.post(`/Pedido`, dados)
      return response.status === 201 || response.status === 200
    }catch(error){
      throw error
    }
  }

  async obterPedidosEmail(email: string): Promise<PedidoModel[]>{
    try{
      const response = await api.get(`/Pedido/${email}`);
      const dados = response.data;

      return dados;
    }
    catch(error){
      throw error
    }
  }
}

export default new PedidoService();
