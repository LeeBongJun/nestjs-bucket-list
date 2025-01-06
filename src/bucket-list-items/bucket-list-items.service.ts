import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BucketList } from 'src/bucket-lists/entities/bucket-list.entity';
import { Repository } from 'typeorm';
import { BucketListItem } from './entities/bucket-list-item.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateBucketListItemDto } from './dto/create-bucket-list-item.dto';
import { BucketListsService } from 'src/bucket-lists/bucket-lists.service';
import { UpdateBucketListItemDto } from './dto/update-bucket-list-item.dto';
import { Destination } from 'src/destinations/entities/destination.entity';

@Injectable()
export class BucketListItemsService {
  constructor(
    @InjectRepository(BucketList)
    private readonly bucketListRepository : Repository<BucketList>,
    @InjectRepository(BucketListItem)
    private readonly bucketListItemRepository :  Repository<BucketListItem>,
    @InjectRepository(Destination)
    private readonly destinationRepository : Repository<Destination>,
    @InjectRepository(User)
    private readonly usersRepository :  Repository<User>,
    private readonly bucketListService : BucketListsService,
  ) {}

  async create(
    userId : string , 
    bucketListId : number, 
    model : CreateBucketListItemDto
  ) : Promise<BucketListItem>  {
    const user = await this.usersRepository.findOne({
      where : { id : userId },
    });

    if (!user) {
      throw new UnauthorizedException("유저를 찾지 못했습니다.");
    }
    
    const bucketList = await this.bucketListService.findById(
      userId , 
      bucketListId
    );

    if(!bucketList) {
      throw new BadRequestException("버킷 리스트를 찾지 못하였습니다.");
    }
 
    const destination = await this.destinationRepository.findOne({
      where : {id : model.destinationId}
    })

    if(!destination) {
      throw new BadRequestException("여행지를 찾지 못했습니다.")
    }

    const newBucketListItem = this.bucketListItemRepository.create({
      ...model,
      bucketList,
      destination
    });

    await this.bucketListItemRepository.save(newBucketListItem);

    return {...newBucketListItem , bucketList : undefined};
  }

  async findAll(
    userId : string , 
    bucketListId : number
  ) : Promise<BucketListItem[]> {
    return this.bucketListItemRepository.find({
      where : {
          bucketList : { id : bucketListId  , user : {id : userId }},
      }
    })
  }

  async update (
    userId : string,
    bucketListId : number,
    bucketListItemId : number,
    model : UpdateBucketListItemDto
  ) : Promise<BucketListItem> {
    const bucketListItem = await this.bucketListItemRepository.findOne({
      where : {
        id : bucketListItemId , bucketList : { id : bucketListId , user: { id : userId } }
      }
    })

    if(!bucketListItem) {
      throw new BadRequestException("버킷리스트 아이템을 찾지 못하였습니다.")
    }

    bucketListItem.achieved = model.achieved;

    await this.bucketListItemRepository.save(bucketListItem);

    return {...bucketListItem , bucketList : undefined}
  }

  async remove(
    userId : string,
    bucketListId : number,
    bucketListItemId : number 
  ) : Promise<void> {
    const bucketListItem = await this.bucketListItemRepository.findOne({
      where : {
        id : bucketListItemId , bucketList : { id : bucketListId , user: { id : userId } }
      }
    })

    if(!bucketListItem) {
      throw new NotFoundException("버킷리스트 아이템을 찾지 못하였습니다.")
    }

    await this.bucketListItemRepository.remove(bucketListItem);

  }
}
