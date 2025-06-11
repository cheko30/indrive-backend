import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriversPosition } from './drivers_position.entity';
import { Repository } from 'typeorm';
import { CreateDriverPositionDto } from './dto/create_driver_position';

@Injectable()
export class DriversPositionService {
    constructor(
        @InjectRepository(DriversPosition) private driversPositionRepository: Repository<DriversPosition>
    ){}

    async create(driverPosition: CreateDriverPositionDto) {
        try {
            const data = await this.driversPositionRepository.query(`
                SELECT
                    *
                FROM drivers_position
                WHERE id_driver = ${driverPosition.id_driver}
            `);

            if(data.length <= 0) {
                const newPosition = this.driversPositionRepository.query(`
                    INSERT INTO drivers_position (id_driver, position)
                    VALUES(
                        ${driverPosition.id_driver},
                        ST_GeomFromText('POINT(${driverPosition.lat} ${driverPosition.lng})', 4326)
                    )
                `);
            } else {
                const newPosition = this.driversPositionRepository.query(`
                    UPDATE drivers_position
                    SET position = ST_GeomFromText('POINT(${driverPosition.lat} ${driverPosition.lng})', 4326)
                    WHERE id_driver = ${driverPosition.id_driver}
                `);

            }
            
            return true;   
        } catch (error) {
            console.log('Error creating driver position: ', error);
            return false;
        }
    }

    async getNearByDrivers(client_lat: number, client_lng:number) {
        const driverPosition = await this.driversPositionRepository.query(`
            SELECT 
                id_driver,
                position,
                ST_Distance_Sphere(
                    position,
                    ST_GeomFromText('POINT(${client_lat} ${client_lng})', 4326)
                ) as distance
            FROM drivers_position
            HAVING distance <= 5000
        `);

        return driverPosition;
    }

    delete(id_driver: number) {
        return this.driversPositionRepository.delete(id_driver);
    }
}
