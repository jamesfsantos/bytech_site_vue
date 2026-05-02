import {type CategoriaModel} from "./categoriaModel";

export interface ProdutoModel{
  id: number;
  nome: string;
  categoriaId: number;
  imagem: string;
  descricao: string;
  precoVenda: number;
  estoqueAtual: number;
  marca: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
  ativo: boolean;
  categoria: CategoriaModel;
};
