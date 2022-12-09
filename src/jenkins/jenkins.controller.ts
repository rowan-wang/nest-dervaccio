import {
  Body,
  Controller,
  Post,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { CreatJobDto } from './dto/jenkins.dto';
import { JenkinsService } from './jenkins.service';

@Controller('jenkins')
export class JenkinsController {
  constructor(private readonly jenkinsService: JenkinsService) {}
  @Post('/createJob')
  @Version([VERSION_NEUTRAL, '1'])
  getUserToken(@Body() CreatJobDto: CreatJobDto) {
    return this.jenkinsService.buildProject(CreatJobDto);
  }
}
