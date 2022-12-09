import { Inject, Injectable } from '@nestjs/common';
import { buildJenkins } from '@/helper/jenkins';
@Injectable()
export class JenkinsService {
  async buildProject({
    type = 'h5',
    projectName,
    projectVersion,
    projectGitPath,
    branchName,
    buildPath,
    cache,
  }) {
    const callBack = await buildJenkins({
      type,
      job: 'fe-base-web',
      params: {
        PROJECT_NAME: projectName,
        PROJECT_VERSION: projectVersion,
        PROJECT_GIT_PATH: projectGitPath,
        BRANCH_NAME: branchName,
        BUILD_PATH: buildPath,
        CACHE: cache,
      },
    });
    return callBack;
  }
}
