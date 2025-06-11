import { Client, DistanceMatrixResponseData, TravelMode } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';

const API_KEY = "AIzaSyBh1-kzSQ721V2ad_i3BKO_K5DZ_U1AVq4";

@Injectable()
export class ClientRequestsService extends Client {
    constructor() {
        super();
    }

    async getTimeAndDistanceClientRequest(
        origin_lat: number,
        origin_lng: number,
        destination_lat: number,
        destination_lng: number,
    ): Promise<DistanceMatrixResponseData> {
        const googleResponse = await this.distancematrix({
            params: {
                mode: TravelMode.driving,
                key: API_KEY,
                origins: [
                    {
                        lat: origin_lat,
                        lng: origin_lng
                    }
                ],
                destinations: [
                    {
                        lat: destination_lat,
                        lng: destination_lng
                    }
                ]
            }
        });

        return googleResponse.data;
    }
}
