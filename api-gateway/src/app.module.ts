import { Module } from '@nestjs/common';
import { ProxyrmqpModule } from './proxyrmqp/proxyrmqp.module';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';


@Module({
  imports: [ProxyrmqpModule, CategoriasModule, JogadoresModule],
  controllers: [CategoriasController],
  providers: [],
})
export class AppModule {}
