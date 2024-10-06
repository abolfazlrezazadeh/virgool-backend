import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { blogStatus } from "../enums/status.enum";
@Entity(entityName.Blog)
export class Blog extends BaseFields {
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    content: string
    @Column({nullable:true})
    image: string
    @Column({default:blogStatus.Draft})
    status: string
    @Column()
    authorId: number
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    uodatedAt: Date
}
