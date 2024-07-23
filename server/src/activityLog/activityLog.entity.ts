import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('ActivityLog')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity: string;

  @ManyToOne(() => User, (user) => user.activityLogs)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
