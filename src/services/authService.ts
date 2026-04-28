import api from '@/api/api.ts'

import { type LoginResponse } from '@/types/auth'
import { useRouter } from 'vue-router'

const route = useRouter()

export const authService = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    const { data } = await api.post(`/Auth/login`, { email, senha })
    if (data.token) {
      localStorage.setItem('user_token', data.token)
      localStorage.setItem('user_email', data.usuarioEmail)
      localStorage.setItem('user_nome', data.usuarioNome)
      localStorage.setItem('user_role', data.role)
    }

    return data
  },
  logout(): void {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_email')
    route.push('/login')
  },
  estaAutenticado(): boolean {
    return !!localStorage.getItem('user_token')
  },
}
