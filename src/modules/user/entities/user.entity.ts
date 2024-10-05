import { BaseFields } from "src/common/abstracts/baseFields.abstract";
import { entityName } from "src/common/enums/entityNames.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { ProlfileEntity } from "./profile.entity";

@Entity(entityName.USER)
export class UserEntity extends BaseFields {
    @Column({ unique: true, nullable: true })
    username: string

    @Column({ nullable: true })
    password: string

    @Column({ nullable: true, unique: true })
    phone: string

    @Column({ nullable: true })
    otpId: number

    @Column({ nullable: true })
    method: string

    @OneToOne(() => OtpEntity, otp => otp.user, { nullable: true })
    @JoinColumn({ name: 'otpId' })
    otp: OtpEntity

    //relation to profile entity
    @OneToOne(() => ProlfileEntity, profile => profile.user, { nullable: true, cascade: true })
    @JoinColumn()
    profile: ProlfileEntity

    @Column({ nullable: true })
    profileId: number

    @Column({ nullable: true, unique: true })
    email: string
    
    @Column({ nullable: true, unique: true })
    newEmail: string

    @Column({ nullable: true, default: false })
    verifyEmail: boolean

    @Column({ nullable: true, default: false })
    verifyPhone: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
