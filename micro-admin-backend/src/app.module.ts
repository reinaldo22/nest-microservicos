import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
import { AppController } from './app.controller';
import { AppService } from './app.service.service';
import { CategoriaSchema } from './schema/CategoriaSchema';
import { CourseSchema } from './schema/CourseSchema';
dotenv.config()


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATA_MONGO),
    MongooseModule.forFeature([
      { name: 'Categoria', schema: CategoriaSchema },
      { name: 'Course', schema: CourseSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
