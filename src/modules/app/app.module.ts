import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormDbConfig } from '../../config/typeorm.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal:true,
        envFilePath:join(process.cwd(),".env")
    }),
    TypeOrmModule.forRootAsync({
        useClass:typeormDbConfig,
        inject:[typeormDbConfig] 
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
