import api from '@/api/api'
import type { PagamentoModel } from '@/models/pagamentoModel'

class PagamentoService {
  async gerarPagamento(dados: PagamentoModel): Promise<boolean> {
    try {
      const response = await api.post('/Pagamento', dados)

      return response.status === 201 || response.status === 200
    } catch (error) {
      console.error('Erro ao registrar pagamento na API: ', error)
      return false
    }
  }
}

export default new PagamentoService()
