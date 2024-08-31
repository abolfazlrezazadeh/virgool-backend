import { PrimaryGeneratedColumn } from "typeorm";


export class BaseFields {
    @PrimaryGeneratedColumn("increment")
    id:number
}