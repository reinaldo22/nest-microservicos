import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
dotenv.config()


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATA_MONGO),
    CategoriasModule,
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

// MongooseModule.forFeature([
    //   { name: 'Categoria', schema: CategoriaSchema },
    //   { name: 'Course', schema: CourseSchema }
    // ]),