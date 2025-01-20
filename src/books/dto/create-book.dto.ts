import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Título del libro',
    example: 'El nombre del viento',
  })
  titulo: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Nombre del autor del libro',
    example: 'Patrick Rothfuss',
  })
  autor: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Fecha de publicación del libro en formato ISO 8601',
    example: '2007-03-27',
  })
  fechaPublicacion: string;

  @IsNumber()
  @ApiProperty({
    description: 'Precio del libro',
    example: 19.99,
  })
  precio: number;

  @IsNumber()
  @ApiProperty({
    description: 'Cantidad en stock del libro',
    example: 150,
  })
  stock: number;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Categoría del libro',
    example: 'Fantasía',
  })
  categoria: string;
}
