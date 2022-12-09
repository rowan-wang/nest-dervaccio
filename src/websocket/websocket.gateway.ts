import { AllExceptionsFilter } from '@/common/exceptions/base.exception.filter';
import { BusinessException } from '@/common/exceptions/business.exception';
import { WsServiceExceptionFilter } from '@/common/exceptions/ws.exception.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';

@UseInterceptors(new TransformInterceptor())
@UseFilters(new WsServiceExceptionFilter())
@WebSocketGateway(4000, {
  transports: ['websocket'],
})
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService) {}
  @SubscribeMessage('hello')
  hello(@MessageBody() reqData: { name: string }) {
    if (!reqData || !reqData.name) {
      throw new BusinessException('没参数');
    }
    console.log(JSON.stringify(reqData));
    return 'received reqData';
  }
}
