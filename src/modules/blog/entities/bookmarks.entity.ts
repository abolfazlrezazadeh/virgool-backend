import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity(entityName.BlogBookmarks)
export class BlogBookmarkEntity extends BaseFields{
    @Column()
    userId:number
    @ManyToOne(() => UserEntity, user => user.blogBookmarks, { onDelete: "CASCADE" })
    user: UserEntity

    @ManyToOne(() => BlogEntity, blog => blog.bookmark, { onDelete: "CASCADE" })
    blog: BlogEntity
    @Column()
    blogId:number
}
