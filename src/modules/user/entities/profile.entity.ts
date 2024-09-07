import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, Entity } from "typeorm";


@Entity(entityName.PROFILE)
export class ProlfileEntity extends BaseFields{
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
}