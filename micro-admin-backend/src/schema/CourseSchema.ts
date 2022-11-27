import * as mongoose from 'mongoose';


export const CourseSchema = new mongoose.Schema({
    nome: String,
    telefoneCelular: String,
    email: String,
    ranking: String,
    posicaoRanking: String,
    urlFotoJogador: String,
}, {timestamps: true, collection: 'Course'});
