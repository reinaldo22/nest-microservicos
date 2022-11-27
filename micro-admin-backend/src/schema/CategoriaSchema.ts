import * as mongoose from 'mongoose';


export const CategoriaSchema = new mongoose.Schema({
    categoria: { type: String, unique: true },
    descricao: { type: String },
    eventos: [
        {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: Number }
        }
    ],

    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]

}, { timestamps: true, collection: 'Categoria' });
