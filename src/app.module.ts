import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';
import { RequestLoggerMiddleware } from './logger/request-logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { AsyncStoreModule } from './als/async-store.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLoggerInterceptor } from './logger/response-logger.interceptor';
import { exceptionsInterceptors } from './exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    UsersModule,
    AuthModule,
    LoggerModule,
    AsyncStoreModule,
  ],
  providers: [
    ...exceptionsInterceptors,
    { provide: APP_INTERCEPTOR, useClass: ResponseLoggerInterceptor },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
