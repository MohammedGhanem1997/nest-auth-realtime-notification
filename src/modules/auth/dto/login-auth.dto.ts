import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto  {


    
    @IsNotEmpty({'message' : "Enter a valid email adress"})
    @IsEmail({allow_display_name : true})
    email: string;
    
    @IsNotEmpty({"message" : "Password field cannot be empty"})
    password: string;
}
