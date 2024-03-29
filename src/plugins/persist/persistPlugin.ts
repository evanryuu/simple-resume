import { GithubPersistPlugin } from './impl/GithubPersistPlugin'
import noopPersistPlugin from './impl/NoopPersistPlugin'

import type { ResumePersistApi } from './PersistApi'

export const getPersistApi = (storageMedium: string, token: string, owner: string, repo: string): ResumePersistApi => {
  if (storageMedium === 'github') {
    return new GithubPersistPlugin(token, owner, repo)
  }

  return noopPersistPlugin
}
