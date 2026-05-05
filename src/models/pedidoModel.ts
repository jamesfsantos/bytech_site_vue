export interface PedidoModel {
  id: number
  usuarioId: number
  dataPedido: Date | string
  valorTotalPedido: number
  nomeUsuario: string
  email: string
  celular: string
  cpf: string
  endereco: string
  cep: string
  complemento: string
  cidade: string
  itens: ItemPedidoModel[]
}

export interface ItemPedidoModel {
  id: number
  // pedidoId: number
  produtoId: number
  quantidade: number
  valor: number
  valorTotal: number
  nome: string
}
