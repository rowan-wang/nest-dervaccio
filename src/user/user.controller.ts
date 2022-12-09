import {
  Controller,
  Post,
  Body,
  VERSION_NEUTRAL,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto, getUserTokenDto, getTokenByAppDto } from './dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/getUserToken')
  @Version([VERSION_NEUTRAL, '1'])
  getUserToken(@Body() getUserTokenDto: getUserTokenDto) {
    return this.userService.getUserToken(getUserTokenDto);
  }

  @Post('/getTokenByApp')
  @Version([VERSION_NEUTRAL, '1'])
  getTokenByApp(@Body() getTokenByAppDto: getTokenByAppDto) {
    return this.userService.getTokenByApplications(getTokenByAppDto);
  }

  @Post('/update')
  @Version([VERSION_NEUTRAL, '1'])
  create(@Body() createUserDto: AddUserDto) {
    return this.userService.createOrSave(createUserDto);
  }
}
