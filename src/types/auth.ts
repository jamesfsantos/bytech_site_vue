export interface LoginResponse {
  token: string,
  usuarioEmail: string
  usuarioNome: string
  role: string
}

export interface ErroResponse {
  mensagem: string
}
