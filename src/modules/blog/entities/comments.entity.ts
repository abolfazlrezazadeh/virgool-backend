import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Blog extends BaseFields {
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    content: string
    @Column()
    image: string
    @Column()
    status: string
    @Column()
    authorId: number
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    uodatedAt: Date
}
