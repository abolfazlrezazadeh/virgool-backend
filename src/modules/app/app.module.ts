import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormDbConfig } from '../../config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal:true,
        envFilePath:join(process.cwd(),".env")
    }),
    TypeOrmModule.forRootAsync({
        useClass:typeormDbConfig,
        inject:[typeormDbConfig] 
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
