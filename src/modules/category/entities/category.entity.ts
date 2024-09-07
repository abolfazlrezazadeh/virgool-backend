import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, Entity } from "typeorm";

@Entity(entityName.CATEGORY)
export class CategoryEntity extends BaseFields {
    @Column()
    title: string
    @Column({nullable:true})
    priority:number
}
