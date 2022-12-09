import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddUserDto {
  @ApiProperty({ example: 123 })
  id: number;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'cookieboty@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  username: string;
}

export class getUserTokenDto {
  @ApiProperty({ example: 'rowan' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;
}

export class getTokenByAppDto {
  @ApiProperty({ example: 'xxxxx' })
  @IsNotEmpty()
  code: string;
}
