import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'board'})
export class Board {
  @PrimaryGeneratedColumn({
    name: 'board_id',
  })
  id: number;

  @Column()
  username: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;
}
