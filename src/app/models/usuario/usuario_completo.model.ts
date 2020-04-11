export interface UsuarioCompletoModel {
    id: number,
    primeiro_nome: string,
    ultimo_nome: string,
    email: string,
    senha: string,
    ativo: number,
    created_at: Date,
    updated_at: Date,
    nivel_acesso: string,
    api_key: string,
    codigo_crc: string,
    pais: string,
    estado_regiao: string,
    cidade: string,
    total_segmentacoes: number,
    total_classificacoes: number,
    id_usuario: number
}