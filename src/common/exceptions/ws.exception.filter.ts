import {
  Catch,
  ArgumentsHost,
  HttpException,
  WsExceptionFilter,
} from '@nestjs/common';
import { BusinessException } from './business.exception';

@Catch()
export class WsServiceExceptionFilter implements WsExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let responseWrapper = {};
    // 处理业务异常
    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      // 业务层Exception
      responseWrapper = {
        data: null,
        status: error['code'],
        extra: {},
        message: error['message'],
        success: false,
      };
    } else {
      // 其他错误
      responseWrapper = {
        data: null,
        status: 'IM9999',
        extra: {},
        message: 'server unknown error: ' + exception.message,
        success: false,
      };
    }

    const callback = host.getArgByIndex(2);
    if (callback && typeof callback === 'function') {
      callback(responseWrapper);
    }
  }
}
