import { Module } from '@nestjs/common';
import { ClientRequestsService } from './client_requests.service';
import { ClientRequestsController } from './client_requests.controller';

@Module({
  providers: [ClientRequestsService],
  controllers: [ClientRequestsController]
})
export class ClientRequestsModule {}
