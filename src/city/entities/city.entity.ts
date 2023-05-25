import { AddressEntity } from 'src/address/entities/address.entity';
import { StateEntity } from 'src/state/entities/state.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'city' })
export class CityEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'state_id', nullable: false })
  stateId: number;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => AddressEntity, () => AddressEntity)
  addresses?: AddressEntity[];

  @ManyToOne(() => StateEntity, () => CityEntity)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state: StateEntity;
}
