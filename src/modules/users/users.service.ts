import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource } from 'typeorm';
import { Users  as User} from './entities/user.entity';

@Injectable()
export class UsersService {

  private usersRepository
  constructor(private dataSource: DataSource) {
    // get users table repository to interact with the database
    this.usersRepository = this.dataSource.getRepository(User);
  }
  async create(createUserDto: CreateUserDto):Promise<User| any> {
    return await this.usersRepository.save(createUserDto); 
   }
  async findOne(data:  any): Promise<User | undefined> {
    console.log(data);
    console.log("----------------------------------");
    
    return await this.usersRepository.findOne({where:data});
  }

  findAll() {
    return `This action returns all users`;
  }

  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
