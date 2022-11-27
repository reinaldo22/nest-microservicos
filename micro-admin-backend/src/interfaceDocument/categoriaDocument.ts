import { Document } from "mongoose";
import { Course } from "./courseDocument";



export interface Categoria extends Document {
    readonly categoria: string,
    descricao: string,
    eventos: Array<Evento>,
    courses: Array<Course>
}
export interface Evento {
    nome: string,
    operacao: string,
    valor: number;
  }
