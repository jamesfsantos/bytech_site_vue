export interface UsuarioModel {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    celular: string;
    cpf: string;
    endereco: string;
    complemento: string;
    cidade: string;
    cep: string;
    tipoUsuarioId: number
}
