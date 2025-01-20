import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorias } from './categories.entity';

@Entity('libros')
export class Libros {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('character varying', { name: 'titulo', length: 255, unique: true })
  titulo: string;

  @Column('character varying', { name: 'autor', length: 255 })
  autor: string;

  @Column('date', { name: 'fecha_publicacion' })
  fechaPublicacion: string;

  @Column('numeric', { name: 'precio', precision: 10, scale: 2 })
  precio: number;

  @Column('integer', { name: 'stock' })
  stock: number;

  @ManyToOne(() => Categorias, { cascade: true, eager: true })
  categoria: Categorias;
}
