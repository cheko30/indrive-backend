import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    
    name: string;
    lastname?: string;
    phone: string;
    image?: string;
    notification_token?: string;

}