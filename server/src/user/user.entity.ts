import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  signupDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column({ default: 'user' })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    console.log('Hashing password for:', this.email);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    } else {
      throw new Error('Password is required');
    }
  }
}
