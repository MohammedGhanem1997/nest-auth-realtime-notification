import { Logger } from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ConnectedSocket } from '@nestjs/websockets';

import { Server } from "socket.io";
import { Socket } from "socket.io-client";
import { SocketService } from "src/socket/socket.service";

@WebSocketGateway()
export class NotificationGateway   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService){}
   socketIdToUserIdMap = new Map<string, string>();

  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('NotificationGateway');


  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const { sockets } = this.server.sockets;
       
        const queryParameters = client['handshake'].query;

        const userId = queryParameters.userId;
       console.log(client['handshake']);
       console.log("----------------");
       console.log(userId);
        // client.id=userId
        this.socketIdToUserIdMap.set(client.id, userId);

       
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  @SubscribeMessage('join')
  async join(@ConnectedSocket() client: Socket): Promise<void> {
      console.log(`web-socket api join`);
      // (client as any).socket.join('ghanem');
      client.emit('join', 'successful join');
  }


  async updateData(data: any): Promise<void> {
      console.log(`web-socket api emit data '${JSON.stringify(data)}'`);
      let userId:string= data.userId||'8nem';
    let  socketId = Array.from(this.socketIdToUserIdMap.entries())
      .find(([_, id]) => id === userId)?.[0];
      console.log(socketId);
      
      this.server.to(socketId).emit('join', data.message + 'Hello, specific user!');


  }

  @SubscribeMessage("ping")
  handleMessage(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);

    this.updateData({userId:"8nem",message:"how are you "})
    // return {
    //   event: "pong",
    //   data: "Wrong data that will make the test fail",
    // };
  }
}


