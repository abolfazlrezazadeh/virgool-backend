import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class typeormDbConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        const {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_USERNAME} = process.env;
        return{
            type:"postgres",
            port:DB_PORT,
            host:DB_HOST,
            username:DB_USERNAME,
            password:DB_PASSWORD,
            database:DB_NAME,
            synchronize:true,


        }
    }
}