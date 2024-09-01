import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TipoTarea } from "../enum/tipo-tarea.enum";

@Schema({ collection: 'Tarea' })
export class Tarea {
  @Prop()
  nombre: string

 @Prop({ enum: TipoTarea, default: TipoTarea.PENDIENTE })
   tipo: TipoTarea;

   @Prop()
   descripcion: string
}

 

export const TareaSchema = SchemaFactory.createForClass(Tarea);