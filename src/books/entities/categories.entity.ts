import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Identificador único de la categoría',
    example: 1,
  })
  id: number;

  @Column('character varying', { name: 'nombre', unique: true, length: 100 })
  @ApiProperty({
    description: 'Nombre único de la categoría',
    example: 'Ciencia Ficción',
  })
  nombre: string;

  @OneToMany(() => Libros, (libro) => libro.categoria)
  @ApiProperty({
    description: 'Lista de libros asociados a esta categoría',
    type: () => [Libros],
  })
  libros: Libros[];
}
