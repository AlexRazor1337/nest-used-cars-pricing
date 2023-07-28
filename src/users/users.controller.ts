import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  
  @Get('profile')
  async getProfile(@Session() session: any) {
    const user = await this.userService.findOne(session.userId);
    return user;
  }

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(createUserDto.email, createUserDto.password);
    session.userId = user.id;
    
    return user;
  }

  @Post('signin')
  async signIn(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(createUserDto.email, createUserDto.password);
    session.userId = user.id;
    
    return user;
  }
  
  @Post('signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Partial<CreateUserDto>,
  ) {
    return this.userService.update(id, input);
  }
}
