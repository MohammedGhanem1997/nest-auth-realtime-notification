import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({"message" : "Name field cannot be empty",})
    name: string;
    
    @IsNotEmpty({'message' : "Enter a valid email adress"})
    @IsEmail({allow_display_name : true})
    email: string;
    
    @IsNotEmpty({"message" : "Password field cannot be empty"})
    password: string;
}
