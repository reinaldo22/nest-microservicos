import { Module } from '@nestjs/common';
import { ProxyrmqpModule } from 'src/proxyrmqp/proxyrmqp.module';
import { JogadoresController } from './jogadores.controller';

@Module({
  imports: [ProxyrmqpModule],
  controllers: [JogadoresController]
})
export class JogadoresModule {}
