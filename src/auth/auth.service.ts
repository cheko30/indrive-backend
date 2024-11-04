import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

    async register(user:RegisterUserDto) {

        const emailExists = await this.usersRepository.findOneBy({email: user.email});

        if(emailExists) {
            return new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }

        const phoneExists = await this.usersRepository.findOneBy({phone: user.phone});
        if(phoneExists) {
            return new HttpException('El telefono ya esta registrado', HttpStatus.CONFLICT);
        }

        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }
}
