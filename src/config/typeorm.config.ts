import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class typeormDbConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            type:"postgres",
            port:5432,
            host:"localhost",
            username:"postgres",
            password:"a1234",
            database:"virgool",
            synchronize:true,


        }
    }
}