import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { Column } from "typeorm";

export class Blog extends BaseFields{
    @Column()
    title:string
    @Column()
    description:string
    @Column()
    content:string
    @Column()
    image:string
    @Column()
    authorId:number
}
