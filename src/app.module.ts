import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsModule } from './modules/comments/comments.module';


@Module({
  imports: [CommentsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin2022',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true //Solo desarrollo
  })],
})
export class AppModule { }
