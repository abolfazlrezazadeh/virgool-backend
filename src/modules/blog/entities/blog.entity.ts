import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { blogStatus } from "../enums/status.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BlogLikesEntity } from "./likes.entity";
import { BlogBookmarkEntity } from "./bookmarks.entity";
import { blogCommentsEntity } from "./comments.entity";
@Entity(entityName.Blog)
export class BlogEntity extends BaseFields {
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    content: string
    @Column({ nullable: true })
    image: string
    @Column({ unique: true })
    slug: string
    @Column()
    c: string
    @Column({ default: blogStatus.Draft })
    status: string
    @Column()
    authorId: number

    @ManyToOne(() => UserEntity, user => user.blogs, { onDelete: "CASCADE" })
    author: UserEntity

    @OneToMany(() => BlogLikesEntity, likes => likes.blog, { onDelete: "CASCADE" })
    likes: BlogLikesEntity[]

    @OneToMany(() => BlogBookmarkEntity, bookmark => bookmark.blog, { onDelete: "CASCADE" })
    bookmark: BlogLikesEntity[]

    @OneToMany(() => blogCommentsEntity, comments => comments.blog, { onDelete: "CASCADE" })
    comments: blogCommentsEntity[]

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}
