import { Base64 } from 'js-base64'

import type { ResumePersistApi } from '../PersistApi'
import type { IResumeStorage } from '@/utils/initTemplateData'

type SecretTokenType = 'classic' | 'fine-grained'

type GithubRepoContent = {
  content: string;
  download_url: string;
  encoding: string;
  git_url: string;
  html_utl: string;
  name: string;
  path: string;
  sha: string;
  size: string;
  type: string;
}

export class GithubPersistPlugin implements ResumePersistApi {
  // todo
  tokenType: SecretTokenType

  token: string

  owner: string

  repo: string

  // todo: may be mutli way path (multi resumes)
  path: string

  fileSha: string

  constructor(token:string, owner:string, repo:string) {
    this.tokenType = 'classic'
    this.token = token
    this.owner = owner
    this.repo = repo
    this.path = 'resume.json'
    this.fileSha = ''
  }

  async getResume(): Promise<IResumeStorage | null> {
    const data = await this.getRepoContent()

    return new Promise<IResumeStorage | null>((resolve) => {
      console.log('data', data)
      const resumeData: IResumeStorage = JSON.parse(Base64.decode(data.content))

      resolve(resumeData)
    })
  }

  async updateResume(storageData: IResumeStorage) {
    const data = await this.getRepoContent()

    await fetch(
      this.buildRequestUrl('/repos/{owner}/{repo}/contents/{path}'),
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${this.token}`,
          Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
          message: 'UPDATE RESUME FROM simple-resume',
          committer: {
            name: 'simple-resume client',
            email: 'simple-resume@gmail.com',
          },
          content: Base64.encode(JSON.stringify(storageData)),
          sha: data.sha,
        }),
      },
    )

    return Promise.resolve()
  }

  private buildRequestUrl(templateUrl: string): string {
    const obj: { [key: string]: any } = this
    Object.keys(obj).forEach((key) => {
      templateUrl = templateUrl.replace(new RegExp(`{${key}}`, 'g'), obj[key])
    })
    return `https://api.github.com${templateUrl}`
  }

  private async getRepoContent() : Promise<GithubRepoContent> {
    const response: any = await fetch(
      this.buildRequestUrl('/repos/{owner}/{repo}/contents/{path}'),
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${this.token}`,
        },
      },
    )
    // eslint-disable-next-line no-return-await
    return await response.json()
  }
}
