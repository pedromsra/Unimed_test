import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', nullable: false})    
    name: string

    @Column({type: 'text', nullable: false})    
    telephone: string

    @Column({type: 'date', nullable: false})    
    dateOfBirth: string

    @Column({type: 'text', nullable: false})    
    gender: string

    @Column({type: 'text', nullable: true})    
    wing: string

    @Column({type: 'integer', nullable: true})
    room: number

    @Column({type: 'datetime', nullable: false, default: new Date().toJSON()})
    CREATED_AT: string

    @Column({type: 'datetime', nullable: false, default: new Date().toJSON()})
    UPDATED_AT: string
}