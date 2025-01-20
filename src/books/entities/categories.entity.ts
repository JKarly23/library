import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Libros } from './books.entity';

@Entity('categorias', { schema: 'public' })
export class Categorias {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('character varying', { name: 'nombre', unique: true, length: 100 })
  nombre: string;

  @OneToMany(() => Libros, (libro) => libro.categoria)
  libros: Libros[];
}
