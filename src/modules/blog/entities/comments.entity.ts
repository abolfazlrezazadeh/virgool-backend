import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity(entityName.BlogComments)
export class blogCommentsEntity extends BaseFields {
    @Column()
    text: string
    @Column({ default: false })
    accepted: boolean

    @ManyToOne(() => UserEntity, user => user.blogComments,{onDelete:"CASCADE"})
    user:UserEntity

    @Column()
    userId: string

    @ManyToOne(() => BlogEntity, blog => blog.comments,{onDelete:"CASCADE"})
    blog:BlogEntity

    @Column()
    blogId: number

    @Column()
    parentId: number

    @ManyToOne(()=> blogCommentsEntity, comment => comment.children, {onDelete:"CASCADE"})
    parent: blogCommentsEntity

    @OneToMany(()=> blogCommentsEntity, comment => comment.parent, {onDelete:"CASCADE"})
    @JoinColumn({name:"parent"})
    children: blogCommentsEntity[]

    @CreateDateColumn()
    createdAt: Date
}
