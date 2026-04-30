import api from "@/api/api";
import { type ProdutoModel } from "@/models/produtoModel";

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
    try {
      const response = await api.get<ProdutoModel>(`/produto/${produtoId}`);
      const produtos = response.data;
      return produtos;
    }
    catch (error: unknown) {
      console.error("Erro na chamada...", error);
      throw error;
    }
  }

  async buscarProdutos(): Promise<ProdutoModel[]> {
    try {
      const { data } = await api.get<ProdutoModel[]>('/Produto');
      return data
    }catch(erro: unknown){
      console.error("Erro ao buscar os produtos na api!",erro)
      throw erro
    }

  }

  async cadastrarProduto(dados: Omit<ProdutoModel, 'id' | 'categoria'>): Promise<boolean>{
    try{
        const response = await api.post("/Produto", dados)
        return response.status === 201 || response.status === 200
    }
    catch(erro: unknown){
      console.error(erro)
    }

  }
}


export default new ProdutoService();
