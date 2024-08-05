import { Injectable, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,private jwtService :JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne({"email":email});
      console.log(await bcrypt.hash(pass, 10));
      console.log(user);
      if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    @UseGuards(LocalAuthGuard)

    async login(user: any) {
      console.log("=========================");

      const payload = { 
          user : {
              id: user.user.id, 
              email: user.user.email, 
              name: user.user.name, 
              created_at: user.user.created_at, 
              updated_at: user.user.updated_at 
          }
      };
      console.log({payload});
      return {
        access_token: this.jwtService.sign(payload),
      };
  
    }
  
      async register(createUserDto: CreateUserDto):Promise< any> {
        console.log(createUserDto);
        console.log(createUserDto);
        console.log("1----------------------------------------------------------------");
        
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
          let response = await this.usersService.create(createUserDto);
          if (response) {
              const { password, ...result } = response;
              return result;
          }
      }
  
    decodeToken(token) : any {
      return this.jwtService.decode(token)
    }
  
}
