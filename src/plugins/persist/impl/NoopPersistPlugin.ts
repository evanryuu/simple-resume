import type { ResumePersistApi } from '../PersistApi'
import type { IResumeStorage } from '@/utils/initTemplateData'

class NoopPersistPlugin implements ResumePersistApi {
  // eslint-disable-next-line class-methods-use-this
  async getResume(): Promise<IResumeStorage | null> {
    return Promise.resolve(null)
  }

  // eslint-disable-next-line class-methods-use-this
  updateResume() {
    return Promise.resolve()
  }
}

export default new NoopPersistPlugin()
