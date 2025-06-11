import { Controller, Get, Param } from '@nestjs/common';
import { ClientRequestsService } from './client_requests.service';

@Controller('client-requests')
export class ClientRequestsController {

    constructor(private clientRequestsService: ClientRequestsService) {}

    @Get(':origin_lat/:origin_lng/:destination_lat/:destination_lng')
    getTimeAndDistanceClientRequest(
        @Param('origin_lat') origin_lat: number,
        @Param('origin_lng') origin_lng: number,
        @Param('destination_lat') destination_lat: number,
        @Param('destination_lng') destination_lng: number,
    ) {
        return this.clientRequestsService.getTimeAndDistanceClientRequest(
            origin_lat,
            origin_lng,
            destination_lat,
            destination_lng
        );
    }
}
