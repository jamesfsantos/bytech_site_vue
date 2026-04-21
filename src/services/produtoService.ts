import api from "@/api/api";
import {type ProdutoModel} from "@/models/produtoModel";

class ProdutoService {
  async buscarPorCategoria(categoriaId: number): Promise<ProdutoModel[]> {
    try {
      const response = await api.get<ProdutoModel[]>(`/Produto/${categoriaId}`);
      const produtos = response.data;
      return produtos;
    } catch (error: unknown) {
      console.error("Erro na chamada", error);
    }
    return [];
  }
}


export default new ProdutoService();
