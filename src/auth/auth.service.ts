import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtInterface } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const salt = +this.configService.get('SALT');
    try {
      const user = this.authRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(password, salt),
      });
      await this.authRepository.save(user);
      return {
        ...createUserDto,
        token: this.getJwtToken({ id: user.id, username: user.username }),
      };
    } catch (error) {
      this.handlerError(error);
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    try {
      const user = await this.authRepository.findOne({ where: { username } });
      if (!user) throw new UnauthorizedException('Credential are not valid');
      if (!(await bcrypt.compare(password, user.password)))
        throw new UnauthorizedException('Credential are not valid');
      return {
        username: user.username,
        token: this.getJwtToken({ id: user.id, username: user.username }),
      };
    } catch (error) {
      this.handlerError(error);
    }
  }
  private getJwtToken(payload: JwtInterface) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  private handlerError(error: any) {
    if (error.code == 23505) {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(error.message);
  }
}
