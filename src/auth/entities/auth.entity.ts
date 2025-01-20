import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'ID único del usuario',
    example: 1,
  })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'johndoe',
  })
  username: string;

  @Column()
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'securepassword123',
  })
  password: string;
}
