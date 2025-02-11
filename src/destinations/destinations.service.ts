import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destinaiont.dto';
import { Repository } from 'typeorm';
import { Destination } from './entities/destination.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DestinationsService {
  constructor (
    @InjectRepository(Destination)
    private readonly destinationsRepository : Repository<Destination>
  ){}
  //2.	**여행지 등록 API** - 새로운 여행지 등록 API 구현 (POST /destinations)
  async create(model : CreateDestinationDto) : Promise<Destination>{
      const exisitingDestination = await this.destinationsRepository.findBy({
        name : model.name
      });
      if(exisitingDestination.length > 0) {
        throw new BadRequestException("이미 존재하는 여행지입니다.")
      }

      const destinaiont = this.destinationsRepository.create({
        ...model
      });

      const createdDestination = await this.destinationsRepository.save(destinaiont);

      return createdDestination;
  }

  //3.	**여행지 목록 조회 API** - 모든 여행지 목록을 조회하는 API 구현 (GET /destinations)
  async findAll() : Promise<Destination[]> {
    return this.destinationsRepository.find();
  }

  //4.	**여행지 상세 조회 API** - 특정 여행지의 세부 정보를 조회하는 API 구현 (GET /destinat ions/:id) 
  async findById(id : number) {
     return this.destinationsRepository.findOneBy({
      id
     })
  }

  //5.	**여행지 삭제 API** - 특정 여행지 삭제 API 구현 (DELETE /destinations/:id)
  async remove(id: number) {
      const exisitingDestination = await this.findById(id);

      if(exisitingDestination) {
        await this.destinationsRepository.delete(id)
        return
      }
      
      throw new NotFoundException("존재하지 않는 여행지입니다.")
  }
}