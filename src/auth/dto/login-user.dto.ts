import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Nombre de usuario para el login',
    example: 'johndoe',
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  username: string;

  @ApiProperty({
    description: 'Contraseña para el login',
    example: 'SecurePassword123',
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  password: string;
}
