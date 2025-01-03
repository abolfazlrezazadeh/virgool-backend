import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { BlogCategoryEntity } from "src/modules/blog/entities/blog-category.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(entityName.CATEGORY)
export class CategoryEntity extends BaseFields {
    @Column()
    title: string
    @Column({nullable:true})
    priority:number
    @OneToMany(() => BlogCategoryEntity, blogCategory => blogCategory.category, { onDelete: "CASCADE" })
    blogCategories: BlogCategoryEntity[]
}
