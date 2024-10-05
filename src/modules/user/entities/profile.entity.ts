import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity(entityName.PROFILE)
export class ProlfileEntity extends BaseFields{
    @Column()
    userId:number
    @Column()
    naickName:string
    @Column({nullable:true})
    bio:string
    @Column({nullable:true})
    image:string
    @Column({nullable:true})
    backgroundImage:string
    @Column({nullable:true})
    gender:string
    @Column({nullable:true})
    birthday:string
    @Column({nullable:true})
    linkedIn:string
    @Column({nullable:true})
    twitter:string

    // relation of user entity
    @OneToOne(() => UserEntity, user => user.profile, { onDelete: "CASCADE" })
    user: UserEntity
}
