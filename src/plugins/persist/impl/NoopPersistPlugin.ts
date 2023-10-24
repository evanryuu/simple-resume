import type { ResumePersistApi } from '../PersistApi'
import type { IResumeStorage } from '@/utils/initTemplateData'


class NoopPersistPlugin implements ResumePersistApi {

    async getResume(): Promise<IResumeStorage | null> {
       return Promise.resolve(null)
    }

    updateResume(data: IResumeStorage)  {
        return Promise.resolve()
    }
}

export default new NoopPersistPlugin()