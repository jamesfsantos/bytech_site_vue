import api from '@/api/api'
import { type CategoriaModel } from '@/models/categoriaModel'

class CategoriaService {
  async ObterCategorias(): Promise<CategoriaModel[]> {
    try {
      const response = await api<CategoriaModel[]>(`/Categoria`)
      return response.data
    } catch (error: unknown) {
      console.error(error)
    }
    return []
  }
}

export default new CategoriaService()
