import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: AuthEmailLoginDto) {
    return this.service.validateLogin(loginDto);
  }

  @ApiBearerAuth()
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async me(@Request() request) {
    return this.service.me(request.user);
  }

  @ApiBearerAuth()
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async update(@Request() request, @Body() userDto: AuthUpdateDto) {
    return this.service.update(request.user, userDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(
    @Request() request,
    @Body() userRegisterDto: AuthRegisterDto,
  ) {
    return this.service.register(userRegisterDto);
  }
}
