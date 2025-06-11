import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash} from "bcrypt";
import { Rol } from "src/roles/rol.entity";
import { DriversPosition } from "src/drivers_position/drivers_position.entity";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    lastname:string

    @Column({unique: true})
    email:string

    @Column({unique: true})
    phone:string

    @Column({nullable: true})
    image:string

    @Column()
    password:string

    @Column({nullable: true})
    notification_token:string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at:string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updated_at:string

    @JoinTable({
        name: 'user_has_roles',
        joinColumn: {
            name: 'id_user'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[]

    @OneToMany(() => DriversPosition, driversPosition => driversPosition.id_driver)
    driversPosition: DriversPosition

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

}