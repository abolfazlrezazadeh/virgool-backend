import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity(entityName.OTP)
export class OtpEntity extends BaseFields {
    @Column()
    code: string
    @Column()
    expiresIn: Date
    @Column({ nullable: true })
    method: string
    @Column()
    userId: number
    @OneToOne(() => UserEntity, user => user.otp, { onDelete: "CASCADE" })
    user: UserEntity
}