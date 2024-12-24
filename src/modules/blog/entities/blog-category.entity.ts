import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
@Entity(entityName.BlogCategory)
export class BlogCategoryEntity extends BaseFields {
    @Column()
    blogId: number
    @Column()
    categoryId: number
    @ManyToOne(() => BlogEntity, blog => blog.category, { onDelete: "CASCADE" })
    blog: BlogEntity
    @ManyToOne(() => CategoryEntity, category => category.blogCategories, { onDelete: "CASCADE" })
    category: CategoryEntity
}
