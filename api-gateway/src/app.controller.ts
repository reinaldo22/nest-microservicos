import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CategoriaDTO } from './dto/categoriaDTO';
import * as dotenv from 'dotenv'
dotenv.config()

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_CONECCION],
        queue: 'admin-backend'
      }
    })
  }

  @Post('categoria')
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() categoriaDTO: CategoriaDTO) {
    return this.clientAdminBackend.emit('criar-categoria', categoriaDTO);
  }

  @Get()
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {

    return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '')

  }

  @Get('/:_id')
  findOne(@Param('_id') _id: string) {
    return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '')
  }


  @Put('categoria/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(@Body() atualizarCategoriaDto: CategoriaDTO, @Param('_id') _id: string) {
    this.clientAdminBackend.emit('atualizar-categoria', { id: _id, categoria: atualizarCategoriaDto })
  }
}
