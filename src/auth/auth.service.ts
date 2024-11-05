import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    async register(user:RegisterAuthDto) {

        const emailExists = await this.usersRepository.findOneBy({email: user.email});

        if(emailExists) {
            return new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }

        const phoneExists = await this.usersRepository.findOneBy({phone: user.phone});
        if(phoneExists) {
            return new HttpException('El telefono ya esta registrado', HttpStatus.CONFLICT);
        }

        const newUser = this.usersRepository.create(user);
        const userSaved = await this.usersRepository.save(newUser);
        
        const payload = { id: userSaved.id, name: userSaved.name };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userSaved,
            token: 'Bearer ' + token,
        }

        delete data.user.password
        return data;
    }

    async login(loginData: LoginAuthDto) {
        const { email, password } = loginData;
        const userFound = await this.usersRepository.findOneBy({email: email});

        if(!userFound) {
            return new HttpException('El email no esta registrado', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await compare(password, userFound.password);
        if(!isPasswordValid) {
            return new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
        }

        const payload = { id: userFound.id, name: userFound.name };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userFound,
            token: 'Bearer ' + token,
        }

        delete data.user.password

        return data;

    }
}
