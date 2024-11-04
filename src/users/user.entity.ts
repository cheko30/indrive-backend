import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash} from "bcrypt";

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

}