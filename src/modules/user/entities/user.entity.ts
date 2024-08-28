import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity(entityName.USER)
export class UserEntity extends BaseFields {
    @Column({unique:true})
    username:string
    @Column({nullable:true})
    password:string
    @Column({nullable:true,unique:true})
    phone:string
    @Column({nullable:true,unique:true})
    email:string
    @CreateDateColumn()
    createdAt:Date
    @UpdateDateColumn()
    updatedAt:Date
}
    