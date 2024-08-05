import { Users } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  author: string;

  @Column({ default: null, type:"datetime" })
  created_at?:  Date;

  @Column({ default: null, type:"datetime" })
  updated_at?:  Date;

  @ManyToOne(() => Users, user => user.books)
  user: Users
}