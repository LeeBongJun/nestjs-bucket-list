import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { BucketListsService } from './bucket-lists.service';
import { CreateBucketListDto } from './dto/create-bucket-list.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Request } from 'express'

@Controller('bucket-lists')
export class BucketListsController {
  constructor(
    private readonly bucketListService : BucketListsService
  ) {}

  @Post('')
  @UseGuards(AccessTokenGuard)
  async createBucketList(
    @Body() body : CreateBucketListDto,
    @Req() req:Request
  ) {
    const userId = req.user['id'];

    return this.bucketListService.create(userId , body);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async getBucketListById(
    @Req() req : Request , 
    @Param('id' , ParseIntPipe)  id : number
  ) {
    const userId = req.user['id']

    return this.bucketListService.findById(userId , id);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async deleteBucketList(
    @Req() req : Request , 
    @Param('id' , ParseIntPipe)  id : number
  ) {
    const userId = req.user['id']

    return this.bucketListService.remove(userId , id);
  }

}
