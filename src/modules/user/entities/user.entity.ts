import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity(entityName.USER)
export class UserEntity extends BaseFields {
    @Column({ unique: true })
    username: string

    @Column({ nullable: true })
    password: string

    @Column({ nullable: true, unique: true })
    phone: string

    @Column({ nullable: true })
    otpId: number

    @OneToOne(() => OtpEntity, otp => otp.user, { nullable: true })
    @JoinColumn({ name: 'otpId' })
    otp: OtpEntity

    @Column({ nullable: true, unique: true })
    email: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
