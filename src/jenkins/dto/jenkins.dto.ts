import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatJobDto {
  @ApiProperty({ example: 123 })
  projectId: number;

  @ApiProperty({ example: 'projectName' })
  projectName: number;

  @ApiProperty({ example: 'http://' })
  projectGitPath: number;

  @ApiProperty({ example: 'dev' })
  @IsNotEmpty()
  branchName: string;

  @ApiProperty({ example: '1.0.0' })
  @IsNotEmpty()
  projectVersion: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  buildPath: string;

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  type: 'web';

  @ApiProperty({ example: false })
  @IsNotEmpty()
  cache: boolean;
}
