import api from '@/api/api'
import type { PedidoModel } from '@/models/pedidoModel'
import type { ProdutosVendidosDto } from '@/types/produtosVendidosDto'



class PedidoService {
  async criarPedido(dados: PedidoModel): Promise<boolean> {
    try {
      const response = await api.post(`/Pedido`, dados)
      return response.status === 201 || response.status === 200
    } catch (error) {
      throw error
    }
  }

  async obterTodosPedidos(): Promise<PedidoModel[]>{
    try{
      const response = await api.get(`/Pedido`);
      const dados = response.data;

      return dados
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
      const mensagemErro = error.response?.data?.message || "Erro inesperado ao buscar Pedidos.";
      throw new Error(mensagemErro);
    }
  }

  async obterPedidosEmail(email: string): Promise<PedidoModel[]> {
    try {
      const response = await api.get(`/Pedido/email/${email}`)
      const dados = response.data

      return dados
    } catch (error) {
      throw error
    }
  }

  async atualizarStatus(idPedido: number, idStatus: number) {
    return await api.patch(`/pedido/${idPedido}/status/${idStatus}`)
  }

  async obterPedidoId(id: number): Promise<PedidoModel>{
    try{
      const response = await api.get(`/Pedido/${id}`)
      const dados = response.data
      return dados;
    }
    catch(error){
      throw error
    }
  }

  async obterProdutosVendidos(): Promise<ProdutosVendidosDto[]>{
    try{
      const response = await api.get(`/Pedido/produtosVendidos`)
      const dados = response.data;

      return dados;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
      const mensagemErro = error.response?.data?.message || "Erro inesperado ao buscar os Produtos Vendidos.";
      throw new Error(mensagemErro);
    }
  }
}

export default new PedidoService()
