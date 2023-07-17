import { AccessControll } from 'src/access-controll/entities/access-controll.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PERMISSIONS } from 'src/common/enums/permissions.enum';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'enum', enum: PERMISSIONS, default: PERMISSIONS.READ })
  name: PERMISSIONS;

  @OneToMany(
    () => AccessControll,
    (accessControll) => accessControll.permission,
    { cascade: true },
  )
  accessControlls: AccessControll[];
}
