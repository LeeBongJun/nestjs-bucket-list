import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { sign } from 'crypto';
import { SignInDto } from './dto/sign-in.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refresg-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto : SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() SignInDto : SignInDto) {
    return this.authService.signIn(SignInDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signOut(@Req() req : Request) {
      const userId = req.user['sub'];

      this.authService.signOut(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshAllToken(@Req() req : Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];


    return this.authService.refreshAllTokens(userId , refreshToken);
  }
}
