import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';


@Injectable()
export class CategoriasService {
    constructor(@InjectModel("Categoria") private readonly categoriaSchema: Model<Categoria>
    ) { }

    private readonly logger = new Logger(CategoriasService.name);

    async criaCategoria(categoria: Categoria): Promise<Categoria> {
        try {
            const categoriaCriada = new this.categoriaSchema(categoria)
            return await categoriaCriada.save()
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message);
        }
    }

    async findAllCategoria(): Promise<Array<Categoria>> {
        try {
            return await this.categoriaSchema.find().exec()
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message);
        }

    }
    async consultarCategoriaPeloId(_id: string): Promise<Categoria> {
        try {

            return await this.categoriaSchema.findOne({ _id }).exec()

        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }

    }


    async atualizarCategoria(_id: string, categoria: Categoria): Promise<void> {

        try {

            await this.categoriaSchema.findOneAndUpdate({ _id }, { $set: categoria }).exec()
            console.log("Testando atualização admin-backend")
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }
}
