import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', select: false })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', select: false })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', select: false })
  deletedAt: Date;
}
