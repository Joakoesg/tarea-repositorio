import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tarea } from './schema/tarea.schema';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareaService {
    constructor(
     @InjectModel(Tarea.name)
     private readonly tareaModel: Model<Tarea>   
    ){}

    async create (createTareaDto: CreateTareaDto ){
        const tarea= new this.tareaModel({
            nombre:createTareaDto.nombre,
            tipo:createTareaDto.tipo,
            descripcion:createTareaDto.descripcion,
        })
        
        return await tarea.save()
    }
    
    async findAll(){
        return await this.tareaModel.find()
    }

    async findOne(tarea_id: string){
        return await this.tareaModel.findById(tarea_id)
    }
    async update(tarea_id: string, updateTareaDto: UpdateTareaDto) {
        const tareaId = new Types.ObjectId(tarea_id)
        const tarea = await this.tareaModel.findById(tareaId)
        if (!tarea) {
          throw new BadRequestException('Tarea no encontrada')
        }
    
        tarea.nombre = updateTareaDto.nombre;
        tarea.tipo = updateTareaDto.tipo;
        tarea.descripcion = updateTareaDto.descripcion;
    
        return await tarea.save()
      }
    
      async remove(tarea_id: string) {
        const tarea = await this.tareaModel.findById(tarea_id)
        if(!tarea){
          throw new BadRequestException('Tarea no encontrada')
        }
    
        await this.tareaModel.findByIdAndDelete(tarea_id)
    
        return { sucess: true }
      }


}
