import * as crypto from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column()
  public password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
}
