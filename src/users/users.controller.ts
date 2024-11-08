import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    
    @Post()
    create(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.usersService.update(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(@UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10}),
                    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                ]
            })
        ) file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() user: UpdateUserDto
    ) {
        return this.usersService.uploadWithImage(file, id, user);
    }
}
