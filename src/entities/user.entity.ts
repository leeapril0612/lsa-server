import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user'})
export class User {
  // @PrimaryGeneratedColumn({
  //   name: 'user_id',
  // })
  // id: number;

  @Column({ 
    length: 100,
    primary:true 
  })
  username: string;

  @Column({ length: 20 })
  name: string;
  
  @Column({ length: 100 })
  password: string;

  @Column('datetime', {
    name: 'last_login_date',
    // default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  lastLoginDate: Date;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;
}
