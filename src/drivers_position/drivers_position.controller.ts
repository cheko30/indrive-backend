import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateDriverPositionDto } from './dto/create_driver_position';
import { DriversPositionService } from './drivers_position.service';

@Controller('drivers-position')
export class DriversPositionController {

    constructor(
        private driversPositionService: DriversPositionService
    ){}

    @Post()
    create(@Body() driversPosition: CreateDriverPositionDto) {
        return this.driversPositionService.create(driversPosition);
    }

    @Get(':client_lat/:client_lng')
    getNearByDrivers(@Param('client_lat') client_lat:number, @Param('client_lng') client_lng:number) {
        return this.driversPositionService.getNearByDrivers(client_lat, client_lng);
    }

    @Delete(':id_driver')
    deleteDriverPosition(@Param('id_driver', ParseIntPipe) id_driver: number) {
        return this.driversPositionService.delete(id_driver);
    }

}
