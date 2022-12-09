import { NestFactory } from '@nestjs/core';
/*-- 全局异常/成功捕获 -- */
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';

import {
  VersioningType,
  VERSION_NEUTRAL,
  ValidationPipe,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
declare const module: any;

// FastifyAdapter 替换默认Express
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // 全局路由前缀
  app.setGlobalPrefix('api');
  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // 启动全局字段校验，保证请求接口字段校验正确
  app.useGlobalPipes(new ValidationPipe());

  // 创建文档
  generateDocument(app);

  await app.listen(3000);
}
bootstrap();
