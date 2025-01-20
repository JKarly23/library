import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'johndoe',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'SecurePassword123',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have an uppercase letter, a lowercase letter, and a number',
  })
  password: string;
}
