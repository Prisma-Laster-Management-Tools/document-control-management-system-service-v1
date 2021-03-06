import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity()
export class PurchasementRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commercial_number: string; // 'CUSTOM' <= if it's a special request

  //
  // ─── STAMP ──────────────────────────────────────────────────────────────────────
  //

  @Column()
  company: string;

  @Column()
  seller: string;

  @Column({ nullable: true })
  contact_number: string;

  @Column()
  email: string;

  @Column()
  part_number: string;

  @Column()
  part_name: string;

  @Column()
  quantity: string; // 1ชิ้น , 1 กิโล , 1 อัน

  @Column()
  price: number; // price [dealing price]

  // ────────────────────────────────────────────────────────────────────────────────

  @Column({ default: false })
  is_special_request: boolean;

  @Column({ nullable: true })
  special_part_name: string; // custom part name

  @Column({ nullable: true })
  special_part_contact: string; // custom contact email

  @Column()
  confirmation_token: string;

  @Column({ default: false })
  being_confirmed: boolean;

  //
  // ─── NEW SYSTEM ─────────────────────────────────────────────────────────────────
  //
  @Column({ nullable: true, default: null })
  is_order_accepted: boolean | null;

  @Column({ nullable: true, default: null })
  delivery_attachments: string;

  @Column({ nullable: true, default: null })
  payment_attachments: string;

  @Column({ default: false })
  purchasement_successfully: boolean;

  // ────────────────────────────────────────────────────────────────────────────────

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
