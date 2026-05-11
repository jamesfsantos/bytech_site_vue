export interface PagamentoModel {
  id: number,
  idPedido: number,
  metodo: string,
  status: string,
  dataConfirmacao: Date
}
