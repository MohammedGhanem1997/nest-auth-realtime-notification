import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response as response } from 'express';
import { Users } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto,@Response() res :response) {
    try {
     let user:Users= await this.usersService.create(createUserDto)
          return( user && res.status(HttpStatus.CREATED).json({message:"done"}))
        
    } catch (error) {
      console.log("createe error",error);
      
      return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error:"general error",message:"general error"}); 
    }
   
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
