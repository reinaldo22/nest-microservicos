import { Module } from '@nestjs/common';
import { ProxyrmqpModule } from 'src/proxyrmqp/proxyrmqp.module';
import { CategoriasController } from './categorias.controller';

@Module({
    imports: [ProxyrmqpModule],
    controllers: [CategoriasController]
})
export class CategoriasModule { }
