import { Controller, Get, INestApplication } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationGateway } from './notification/notification.gateway';
import { io, Socket } from 'socket.io-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly notificationGateway:NotificationGateway) {}

  @Get()
  async getHello() :  Promise<any> {
    // let ioClient: Socket;
    // // Get the gateway instance from the app instance
    // // Create a new client that will interact with the gateway
    // ioClient = io("http://localhost:3000", {
    //   autoConnect: false,
    //   transports: ["websocket", "polling"],
    // });
    // ioClient.connect();
    // ioClient.emit("ping", "Hello world!");
    
     
    // ioClient.disconnect();
  
    const notificationData = {
      message: 'Hello, this is a notification to Ghanem!',
    };

    // Call the method in the gateway to emit the notification
    this.notificationGateway.updateData( notificationData);

    return { success: true, message: 'Notification sent' };
  }
}
