import { Module } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarea, TareaSchema } from './schema/tarea.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tarea.name, schema: TareaSchema }])],
  providers: [TareaService],
  controllers: [TareaController]
})
export class TareaModule {}