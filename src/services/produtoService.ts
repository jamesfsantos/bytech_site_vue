import api from "@/api/api";
import {type ProdutoModel} from "@/models/produtoModel";

class ProdutoService {
  async buscarPorCategoria(categoriaId: number): Promise<ProdutoModel[]> {
    try {
      const response = await api.get<ProdutoModel[]>(`/produto/categoria/${categoriaId}`);
      const produtos = response.data;
      return produtos;
    } catch (error: unknown) {
      console.error("Erro na chamada", error);
    }
    return [];
  }

  async buscarProdutoPorId(produtoId: number): Promise<ProdutoModel> {
    try{
      const response = await api.get<ProdutoModel>(`/produto/${produtoId}`);
      const produtos = response.data;
      return produtos;
    }
    catch(error: unknown)
    {
      console.error("Erro na chamada...", error);
      throw error;
    }
  }
}


export default new ProdutoService();
