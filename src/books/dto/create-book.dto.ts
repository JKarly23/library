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

export class CreateBookDto {
  @IsString()
  @MinLength(1)
  titulo: string;

  @IsString()
  @MinLength(1)
  autor: string;

  @IsString()
  @MinLength(1)
  fechaPublicacion: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  stock: number;

  @IsString()
  @MinLength(1)
  categoria: string;
}
