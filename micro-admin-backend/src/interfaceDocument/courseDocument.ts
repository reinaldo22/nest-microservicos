import { Document } from "mongoose";


export interface Course extends Document {
    readonly telefoneCelular: String,
    readonly email: String,
    nome: String,
    ranking: String,
    posicaoRanking: String,
    urlFotoJogador: String,
}