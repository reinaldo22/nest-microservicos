import { Controller, Logger } from '@nestjs/common';
import { createGrpcMethodMetadata, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service.service';
import { Categoria } from './interfaceDocument/categoriaDocument';

const ackErrors: string[] = ['E11000']


@Controller()
export class AppController {
  constructor(private appService: AppService) { }

  logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async categoriaCriada(@Payload() categoria: Categoria, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    this.logger.log(`categoria: ${JSON.stringify(categoria)}`)

    try {
      await this.appService.criaCategoria(categoria)
      await channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`error:  ${JSON.stringify(error.message)}`)
      ackErrors.map(async ackError => {
        if (error.message.includes(ackError)) {
          await channel.ack(originalMsg)
        }
      })
    }

  }

  @MessagePattern('consultar-categorias')
  async consultarCategorias(@Payload() _id: string, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      if (_id) {
        return await this.appService.consultarCategoriaPeloId(_id)
      } else {
        return await this.appService.findAllCategoria()
      }
    } finally {
      await channel.ack(originalMsg)
    }
  }

  @EventPattern('atualizar-categoria')
  async atualizaCategorias(@Payload() data: any, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    this.logger.log(`data: ${JSON.stringify(data)}`)
    try {
      const _id: string = data.id
      const categoria: Categoria = data.categoria
      await this.appService.atualizarCategoria(_id, categoria)
      await channel.ack(originalMsg)


    } catch (error) {
      this.logger.error(`error:  ${JSON.stringify(error.message)}`)
      const filterAckError = ackErrors.filter(
        ackError => error.message.includes(ackError))
      if (filterAckError) {
        await channel.ack(originalMsg)
      }
    }
  }

}
