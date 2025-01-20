import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Identificador único del libro',
    example: 1,
  })
  id: number;

  @Column('character varying', { name: 'titulo', length: 255, unique: true })
  @ApiProperty({
    description: 'Título único del libro',
    example: 'El Principito',
  })
  titulo: string;

  @Column('character varying', { name: 'autor', length: 255 })
  @ApiProperty({
    description: 'Autor del libro',
    example: 'Antoine de Saint-Exupéry',
  })
  autor: string;

  @Column('date', { name: 'fecha_publicacion' })
  @ApiProperty({
    description: 'Fecha de publicación del libro en formato YYYY-MM-DD',
    example: '1943-04-06',
  })
  fechaPublicacion: string;

  @Column('numeric', { name: 'precio', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Precio del libro con hasta dos decimales',
    example: 19.99,
  })
  precio: number;

  @Column('integer', { name: 'stock' })
  @ApiProperty({
    description: 'Cantidad de libros disponibles en stock',
    example: 150,
  })
  stock: number;

  @ManyToOne(() => Categorias, { cascade: true, eager: true })
  @ApiProperty({
    description: 'Categoría a la que pertenece el libro',
    type: () => Categorias,
  })
  categoria: Categorias;
}
