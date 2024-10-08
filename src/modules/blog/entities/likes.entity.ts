import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity(entityName.BlogLikes)
export class BlogLikesEntity extends BaseFields {
    @Column()
    blogId: number
    @Column()
    userId: number
    @ManyToOne(() => UserEntity, user => user.blogLikes, { onDelete: "CASCADE" })
    user: UserEntity
    @ManyToOne(() => BlogEntity, blog => blog.likes, { onDelete: "CASCADE" })
    blog: BlogEntity


    @Column()
    image: string
    @Column()
    authorId: number
}
