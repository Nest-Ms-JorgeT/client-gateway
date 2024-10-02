import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        transport: Transport.TCP,
        name: ORDERS_SERVICE,
        options:{
          host:envs.ordersMs.host,
          port: envs.ordersMs.port
        }
      }
    ])
  ]
})
export class OrdersModule {}
